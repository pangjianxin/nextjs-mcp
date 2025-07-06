using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using System.Collections.Generic;
using Volo.Abp.DependencyInjection;
using Wallee.Mcp.Chat.Dtos;

namespace Wallee.Mcp.Chat
{
    public interface IChatService : ITransientDependency
    {
        IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> Chat(ChatInput input);
    }
}
