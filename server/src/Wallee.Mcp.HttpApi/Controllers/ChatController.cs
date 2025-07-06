using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Wallee.Mcp.Chat;
using Wallee.Mcp.Chat.Dtos;

namespace Wallee.Mcp.Controllers
{
    [Route("api/chat")]
    public class ChatController(IChatService chatService) : McpController
    {
        private readonly IChatService _chatService = chatService;

        [HttpPost("")]
        [Consumes("application/json")]
        public async Task Chat([FromBody] ChatInput message)
        {
            Response.Headers.Append("Content-Type", "text/event-stream");
            Response.Headers.Append("Cache-Control", "no-cache");
            Response.Headers.Append("Connection", "keep-alive");

            await foreach (var item in _chatService.Chat(message))
            {
                var serializedData = System.Text.Json.JsonSerializer.Serialize(
                    item,
                    new System.Text.Json.JsonSerializerOptions
                    {
                        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                    }
                );
                Logger.LogInformation(serializedData);
                // 按 SSE 协议格式输出，每条数据以 "data: ..." 开头，结尾加两个换行符
                await Response.WriteAsync($"data: {serializedData}\n\n");
                await Response.Body.FlushAsync();
            }
        }
    }
}
