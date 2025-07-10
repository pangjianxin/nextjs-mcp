using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Json;
using Wallee.Mcp.Chats;
using Wallee.Mcp.Chats.Dtos;

namespace Wallee.Mcp.Controllers.Chats
{
    [Route("/api/chat")]
    [Authorize]
    public class ChatController : McpController
    {
        private readonly IChatService _chatService;
        private readonly IJsonSerializer _jsonSerializer;

        public ChatController(
            IChatService chatService,
            IJsonSerializer jsonSerializer)
        {
            _chatService = chatService;
            _jsonSerializer = jsonSerializer;
        }

        // 代码整体逻辑基本正确，但有以下几点需要注意：
        // 1. Response.Headers[HeaderNames.ContentType] = "text/event-stream"; 建议使用 Response.ContentType = "text/event-stream";
        // 2. 如果客户端断开连接，WriteAsync 可能会抛出异常，建议捕获并记录异常信息。
        // 3. 建议在 catch 块中返回合适的 HTTP 状态码或结束响应。
        // 4. 建议在流式响应结束后，主动关闭响应流。
        // 5. Logger 可能为 null，建议加以保护（如果有依赖注入则可忽略）。
        // 6. 代码风格建议：await Response.Body.FlushAsync() 可合并到 WriteAsync 之后。

        [HttpPost("agent")]
        public async Task ChatAsync([FromBody] ChatInput input, CancellationToken cancellationToken = default)
        {
            try
            {
                Response.ContentType = "text/event-stream";

                await foreach (var item in _chatService.ChatAsync(input, cancellationToken))
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    Logger?.LogInformation($"Streaming {item}");
                    await Response.WriteAsync($"data:{_jsonSerializer.Serialize(item)}\n\n", cancellationToken: cancellationToken);
                    await Response.Body.FlushAsync(cancellationToken: cancellationToken);
                }
            }
            catch (OperationCanceledException)
            {
                Logger?.LogWarning("Operation Cancelled");
                Response.StatusCode = StatusCodes.Status499ClientClosedRequest;
            }
            catch (Exception ex)
            {
                Logger?.LogError(ex, "Streaming error");
                Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            finally
            {
                // 可选：主动关闭响应流
                await Response.Body.FlushAsync(cancellationToken);
            }
        }
    }
}
