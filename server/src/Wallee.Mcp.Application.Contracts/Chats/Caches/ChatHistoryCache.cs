using Microsoft.SemanticKernel.ChatCompletion;
using Volo.Abp.Caching;

namespace Wallee.Mcp.Chats.Caches
{
    [CacheName("ChatHistoryCache")]
    public class ChatHistoryCache
    {
        public ChatHistory History { get; set; } = [];
    }
}
