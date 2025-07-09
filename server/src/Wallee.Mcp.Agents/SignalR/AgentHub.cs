using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Memory;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;

namespace Wallee.Mcp.SignalR
{
    [HubRoute("/signalr-hubs/ai/agent")]
    [Authorize]
    public class AgentHub(
        [FromKeyedServices("memory-test-agent")] ChatCompletionAgent chatAgent,
        [FromKeyedServices("deepseek-chat")] IChatCompletionService chatClient) : AbpHub
    {
        private const string ChatHistoryKey = "ChatHistoryAgentThread";
        private readonly IChatClient _chatClient = chatClient.AsChatClient();

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (exception != null)
            {
                Logger.LogError("An error occurred during disconnection: {Message}", exception.Message);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public override Task OnConnectedAsync()
        {
            Logger.LogInformation("Client connected to AgentHub.");

            // 只在连接建立时初始化一次
            if (!Context.Items.ContainsKey(ChatHistoryKey))
            {
                var chatHistoryAgentThread = new ChatHistoryAgentThread();
                chatHistoryAgentThread.AIContextProviders.Add(new WhiteboardProvider(_chatClient));
                Context.Items[ChatHistoryKey] = chatHistoryAgentThread;
            }

            return base.OnConnectedAsync();
        }

        public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> Chat(
            string input,
            [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            // 获取当前连接的 ChatHistoryAgentThread  
            if (!Context.Items.TryGetValue(ChatHistoryKey, out var threadObj) || threadObj is not ChatHistoryAgentThread chatHistoryAgentThread)
            {
                // 兜底：如果未初始化则新建（理论上不会发生）  
                chatHistoryAgentThread = new ChatHistoryAgentThread();
                chatHistoryAgentThread.AIContextProviders.Add(new WhiteboardProvider(_chatClient));
                Context.Items[ChatHistoryKey] = chatHistoryAgentThread;
            }

            var message = new ChatMessageContent(AuthorRole.User, input);

            // 先发送消息流
            await foreach (var response in chatAgent.InvokeStreamingAsync(message, chatHistoryAgentThread, cancellationToken: cancellationToken))
            {
                cancellationToken.ThrowIfCancellationRequested();
                yield return response;
            }

            // 所有消息发送完成后再进行历史归约
            if (chatAgent.HistoryReducer != null)
            {
                await chatAgent.ReduceAsync(chatHistoryAgentThread.ChatHistory, cancellationToken: cancellationToken);
            }
        }


        /// <summary>
        /// 单次AI对话，回复内容仅发送给当前客户端
        /// </summary>
        public async Task ChatOnce(string input, CancellationToken cancellationToken)
        {
            // 获取当前连接的 ChatHistoryAgentThread
            if (!Context.Items.TryGetValue(ChatHistoryKey, out var threadObj) || threadObj is not ChatHistoryAgentThread chatHistoryAgentThread)
            {
                chatHistoryAgentThread = new ChatHistoryAgentThread();
                chatHistoryAgentThread.AIContextProviders.Add(new WhiteboardProvider(_chatClient));
                Context.Items[ChatHistoryKey] = chatHistoryAgentThread;
            }

            var message = new ChatMessageContent(AuthorRole.User, input);

            // 先发送消息流
            await foreach (var response in chatAgent.InvokeStreamingAsync(message, chatHistoryAgentThread, cancellationToken: cancellationToken))
            {
                // 将AI回复内容推送给当前客户端
                await Clients.Caller.SendAsync("ReceiveChat", response, cancellationToken);
            }
            // 可选：历史归约
            if (chatAgent.HistoryReducer != null)
            {
                await chatAgent.ReduceAsync(chatHistoryAgentThread.ChatHistory, cancellationToken: cancellationToken);
            }
        }
    }
}
