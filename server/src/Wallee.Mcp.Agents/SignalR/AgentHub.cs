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

        // 在 Chat 方法中，将 ReduceAsync 调用放到后台任务中执行，不阻塞主流程
        public async Task Chat(ChatMessage input)
        {
            // 获取当前连接的 ChatHistoryAgentThread
            if (!Context.Items.TryGetValue(ChatHistoryKey, out var threadObj) || threadObj is not ChatHistoryAgentThread chatHistoryAgentThread)
            {
                throw new Exception("ChatHistoryAgentThread is not initialized. Please connect to the hub first.");
            }

            var message = new ChatMessageContent(AuthorRole.User, input.Input);

            // 先发送消息流
            await foreach (var response in chatAgent.InvokeStreamingAsync(message, chatHistoryAgentThread, cancellationToken: Context.ConnectionAborted))
            {
                // 将AI回复内容推送给当前客户端
                await Clients.Caller.SendAsync("ReceiveChat", response, cancellationToken: Context.ConnectionAborted);
            }
            // 可选：历史归约，放到后台任务中异步执行
            if (chatAgent.HistoryReducer != null)
            {
                _ = Task.Run(() =>
                    chatAgent.ReduceAsync(chatHistoryAgentThread.ChatHistory, cancellationToken: CancellationToken.None)
                );
            }
        }
    }
}
