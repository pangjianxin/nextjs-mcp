using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Memory;
using System.Collections.Generic;
using Volo.Abp.Users;
using Wallee.Mcp.Chat.Dtos;

namespace Wallee.Mcp.Chat
{
    public class ChatService : IChatService
    {
        private readonly ChatCompletionAgent _chatAgent;
        private readonly IChatClient _chatClient;
        private readonly ICurrentUser _currentUser;

        public ChatService(
            [FromKeyedServices("memory-test-agent")] ChatCompletionAgent chatAgent,
            [FromKeyedServices("deepseek-chat")] IChatCompletionService chatClient,
            ICurrentUser currentUser)
        {
            _chatAgent = chatAgent;
            _chatClient = chatClient.AsChatClient();
            _currentUser = currentUser;
        }

        public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> Chat(ChatInput input)
        {
            // Create a whiteboard provider.
            var whiteboardProvider = new WhiteboardProvider(_chatClient);

            // Add the whiteboard provider to the agent thread.
            ChatHistoryAgentThread agentThread = new();

            agentThread.AIContextProviders.Add(whiteboardProvider);

            var message = new ChatMessageContent(AuthorRole.User, input.Message);

            await foreach (var response in _chatAgent.InvokeStreamingAsync(message, agentThread))
            {
                yield return response;
            }
        }
    }
}
