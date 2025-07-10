import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// 定义与ASP.NET Core API匹配的接口
interface ChatInput {
  input: string;
  // 根据你的ASP.NET Core ChatInput模型添加其他属性
}

export async function POST(request: NextRequest) {
  try {
    // 获取用户会话（如果使用NextAuth）
    const session = await auth();

    // 从请求体获取输入数据
    const body = await request.json();
    const { input, ...otherProps } = body;

    if (!input) {
      return new Response("Input is required", { status: 400 });
    }

    // 构建发送到ASP.NET Core API的请求体
    const chatInput: ChatInput = {
      input: input,
      ...otherProps, // 包含其他可能的属性
    };

    // 调用ASP.NET Core API
    const aspNetCoreApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiResponse = await fetch(`${aspNetCoreApiUrl}/api/chat/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        // 添加认证头（根据你的认证方式调整）
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
        // 或者如果使用其他认证方式
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(chatInput),
      signal: request.signal, // 传递取消信号
    });

    if (!apiResponse.ok) {
      console.error(
        `ASP.NET Core API error: ${apiResponse.status} ${apiResponse.statusText}`
      );
      return new Response(`API Error: ${apiResponse.statusText}`, {
        status: apiResponse.status,
      });
    }

    // 创建流式响应 - 直接转发SSE格式
    const stream = new ReadableStream({
      async start(controller) {
        const reader = apiResponse.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.error(new Error("No response body reader available"));
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            // 直接转发SSE格式的数据，不需要额外处理
            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(new TextEncoder().encode(chunk));
          }
        } catch (error) {
          console.error("Stream processing error:", error);
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    // 返回流式响应
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
