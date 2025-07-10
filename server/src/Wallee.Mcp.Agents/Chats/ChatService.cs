using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Users;
using Wallee.Mcp.Chats.Caches;
using Wallee.Mcp.Chats.Dtos;

namespace Wallee.Mcp.Chats
{
    public class ChatService(
                  [FromKeyedServices("corporate-info-agent")] ChatCompletionAgent chatAgent,
                  ICurrentUser currentUser, IDistributedCache<ChatHistoryCache> chatHistory) : IChatService, ITransientDependency
    {
        public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> ChatAsync(ChatInput input, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            var key = $"{currentUser.Id:N}";

            var history = await chatHistory.GetOrAddAsync(key, async () =>
            {
                return await Task.FromResult(new ChatHistoryCache
                {
                    History = []
                });
            });

            var message = new ChatMessageContent(AuthorRole.User, input.Input);

            var chatHistoryAgentThread = new ChatHistoryAgentThread(history!.History, key);

            await foreach (var response in chatAgent.InvokeStreamingAsync(message, chatHistoryAgentThread, cancellationToken: cancellationToken))
            {
                yield return response;
            }

            await chatAgent.ReduceAsync(chatHistoryAgentThread.ChatHistory, cancellationToken: cancellationToken);

            await chatHistory.SetAsync(key, new ChatHistoryCache
            {
                History = chatHistoryAgentThread.ChatHistory
            }, token: cancellationToken);
        }
    }
}
