using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
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
            cancellationToken.ThrowIfCancellationRequested();

            // 获取当前连接的 ChatHistoryAgentThread  
            if (!Context.Items.TryGetValue(ChatHistoryKey, out var threadObj) || threadObj is not ChatHistoryAgentThread chatHistoryAgentThread)
            {
                // 兜底：如果未初始化则新建（理论上不会发生）  
                chatHistoryAgentThread = new ChatHistoryAgentThread();
                chatHistoryAgentThread.AIContextProviders.Add(new WhiteboardProvider(_chatClient));
                Context.Items[ChatHistoryKey] = chatHistoryAgentThread;
            }

            // Fix for CS8602: Ensure HistoryReducer is not null before calling ReduceAsync  
            if (chatAgent.HistoryReducer != null)
            {
                await chatAgent.ReduceAsync(chatHistoryAgentThread.ChatHistory, cancellationToken: cancellationToken);
            }

            var message = new ChatMessageContent(AuthorRole.User, input);

            await foreach (var response in chatAgent.InvokeStreamingAsync(message, chatHistoryAgentThread, cancellationToken: cancellationToken))
            {
                var serializedData = System.Text.Json.JsonSerializer.Serialize(
                    response,
                    new System.Text.Json.JsonSerializerOptions
                    {
                        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                    }
                );
                Logger.LogInformation(serializedData);
                yield return response;
            }
        }
    }
}
