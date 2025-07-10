using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using System.Collections.Generic;
using System.Threading;
using Volo.Abp.DependencyInjection;
using Wallee.Mcp.Chats.Dtos;

namespace Wallee.Mcp.Chats
{
    public interface IChatService : ITransientDependency
    {
        public IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> ChatAsync(ChatInput input, CancellationToken cancellationToken);
    }
}
