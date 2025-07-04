using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Users;

namespace Wallee.Mcp.Chat
{
    public class ChatService : IChatService
    {
        private readonly ChatCompletionAgent _chatAgent;
        private readonly ICurrentUser _currentUser;

        public ChatService([FromKeyedServices("")] ChatCompletionAgent chatAgent, ICurrentUser currentUser)
        {
            _chatAgent = chatAgent;
            _currentUser = currentUser;
        }

        public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> Chat(string input)
        {
            ChatHistoryAgentThread thread = new();
          
            var message = new ChatMessageContent(AuthorRole.User, input);

            await foreach (var response in _chatAgent.InvokeStreamingAsync(message, thread))
            {
                yield return response;
            }
        }
    }
}
