import { deepseek } from "@ai-sdk/deepseek"
import { streamText } from "ai"
import AdvancedMCPManager from "@/lib/advanced-mcp-manager"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const mcpManager = AdvancedMCPManager.getInstance({
      cacheTimeout: 10 * 60 * 1000, // 10分钟缓存
      maxRetries: 3,
      retryDelay: 1000,
    })

    const { tools, client } = await mcpManager.getToolsAndClient()

    const result = streamText({
      model: deepseek("deepseek-chat"),
      messages,
      tools,
      onFinish: async () => {
        // 可以在这里进行健康检查
        await mcpManager.healthCheck()
      },
      onError: async (error) => {
        console.error("Stream error:", error)
        // 强制刷新缓存
        await mcpManager.forceRefresh()
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: "Failed to process your request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
