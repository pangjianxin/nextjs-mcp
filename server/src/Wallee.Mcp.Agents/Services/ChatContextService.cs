using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Wallee.Mcp.Services
{
    public class ChatContextService
    {
        private readonly ConcurrentDictionary<string, List<string>> _conversations = new();

        public List<string> GetOrCreateConversation(string clientId)
            => _conversations.GetOrAdd(clientId, _ => new List<string>());

        public void AddMessage(string clientId, string message)
        {
            var conversation = GetOrCreateConversation(clientId);
            conversation.Add(message);
        }
    }
}
