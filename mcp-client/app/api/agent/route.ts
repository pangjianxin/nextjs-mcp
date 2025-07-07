import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, threadId } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Sending request to remote service:", { message, threadId });

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 调用远程服务
          const remoteResponse = await fetch(
            process.env.REMOTE_API_URL as string,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "text/event-stream",
              },
              body: JSON.stringify({
                message,
                threadId,
              }),
            }
          );

          console.log("Remote response status:", remoteResponse.status);

          if (!remoteResponse.ok) {
            throw new Error(`Remote service error: ${remoteResponse.status}`);
          }

          if (!remoteResponse.body) {
            throw new Error("No response body from remote service");
          }

          const reader = remoteResponse.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            // 使用UTF-8解码
            const chunk = decoder.decode(value, { stream: true });
            console.log("Received chunk:", chunk);

            buffer += chunk;

            // 按照SSE格式处理数据：使用 \n\n 分割数据块
            const events = buffer.split("\n\n");
            buffer = events.pop() || ""; // 保留最后一个可能不完整的事件

            for (const event of events) {
              if (event.trim()) {
                console.log("Processing event:", event);

                // 解析SSE事件
                const lines = event.split("\n");
                let eventData = "";

                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    eventData += line.substring(6); // 移除 "data: " 前缀
                  }
                  // 可以处理其他SSE字段如 event:, id:, retry: 等
                }

                if (eventData.trim()) {
                  console.log("Extracted event data:", eventData);

                  try {
                    const data = JSON.parse(eventData);
                    console.log("Parsed SSE data:", data);

                    // 转发数据到前端，保持SSE格式
                    const sseData = `data: ${JSON.stringify(data)}\n\n`;
                    const encodedData = encoder.encode(sseData);
                    controller.enqueue(encodedData);
                  } catch (parseError) {
                    console.error(
                      "Error parsing SSE JSON:",
                      parseError,
                      "Data:",
                      eventData
                    );
                  }
                }
              }
            }
          }

          // 处理剩余的buffer
          if (buffer.trim()) {
            console.log("Final buffer:", buffer.trim());

            const lines = buffer.split("\n");
            let eventData = "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                eventData += line.substring(6);
              }
            }

            if (eventData.trim()) {
              try {
                const data = JSON.parse(eventData);
                const sseData = `data: ${JSON.stringify(data)}\n\n`;
                const encodedData = encoder.encode(sseData);
                controller.enqueue(encodedData);
              } catch (parseError) {
                console.error("Error parsing final SSE JSON:", parseError);
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);

          // 发送错误信息，使用SSE格式
          const errorData = {
            Message: {
              Content: `连接远程服务时发生错误: ${
                error instanceof Error ? error.message : String(error)
              }`,
              AuthorName: "System",
              Role: { Label: "assistant" },
              ChoiceIndex: 0,
              ModelId: "error",
              Metadata: {
                CompletionId: `error_${Date.now()}`,
                CreatedAt: new Date().toISOString(),
                FinishReason: "error",
              },
            },
            Thread: {
              Id: threadId || `error_thread_${Date.now()}`,
              IsDeleted: false,
            },
          };

          const sseErrorData = `data: ${JSON.stringify(errorData)}\n\n`;
          const errorChunk = encoder.encode(sseErrorData);
          controller.enqueue(errorChunk);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}
