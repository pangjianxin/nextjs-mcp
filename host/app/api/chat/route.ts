import { deepseek } from "@ai-sdk/deepseek"
import { streamText, type CoreMessage } from "ai"
import MCPManager from "@/lib/mcp-manager"

export const maxDuration = 30

// 上下文管理配置
const CONTEXT_CONFIG = {
  maxMessages: 20, // 最大消息数量
  maxTokens: 4000, // 估算的最大 token 数
  keepSystemMessages: true, // 保留系统消息
  keepRecentMessages: 10, // 保留最近的消息数量
}

// 估算消息的 token 数量（简单估算：1个字符约等于0.25个token）
function estimateTokens(message: CoreMessage): number {
  const content = typeof message.content === "string" ? message.content : JSON.stringify(message.content)
  return Math.ceil(content.length * 0.25)
}

// 保留重要上下文的消息过滤函数
function filterMessagesForContext(messages: CoreMessage[]): CoreMessage[] {
  if (messages.length <= CONTEXT_CONFIG.maxMessages) {
    return messages
  }

  // 分离系统消息和对话消息
  const systemMessages = messages.filter((msg) => msg.role === "system")
  const conversationMessages = messages.filter((msg) => msg.role !== "system")

  // 保留最近的对话消息
  const recentMessages = conversationMessages.slice(-CONTEXT_CONFIG.keepRecentMessages)

  // 合并系统消息和最近的对话消息
  const filteredMessages = CONTEXT_CONFIG.keepSystemMessages ? [...systemMessages, ...recentMessages] : recentMessages

  // 检查 token 数量
  let totalTokens = 0
  const finalMessages: CoreMessage[] = []

  // 从后往前添加消息，确保不超过 token 限制
  for (let i = filteredMessages.length - 1; i >= 0; i--) {
    const message = filteredMessages[i]
    const messageTokens = estimateTokens(message)

    if (totalTokens + messageTokens <= CONTEXT_CONFIG.maxTokens) {
      finalMessages.unshift(message)
      totalTokens += messageTokens
    } else if (message.role === "system" && CONTEXT_CONFIG.keepSystemMessages) {
      // 系统消息优先保留
      finalMessages.unshift(message)
    } else {
      break
    }
  }

  return finalMessages
}

// 创建上下文摘要（可选功能）
async function createContextSummary(messages: CoreMessage[]): Promise<string> {
  // 这里可以调用 AI 模型来创建对话摘要
  // 为了简化，这里返回一个简单的摘要
  const userMessages = messages.filter((msg) => msg.role === "user").length
  const assistantMessages = messages.filter((msg) => msg.role === "assistant").length

  return `Previous conversation summary: ${userMessages} user messages, ${assistantMessages} assistant responses. Key topics discussed in earlier messages.`
}

export async function POST(req: Request) {
  const { messages, options = {} } = await req.json()

  try {
    const mcpManager = MCPManager.getInstance()
    const tools = await mcpManager.getTools()

    // 处理消息上下文
    let processedMessages = messages

    // 如果消息太多，进行上下文管理
    if (messages.length > CONTEXT_CONFIG.maxMessages) {
      processedMessages = filterMessagesForContext(messages)

      // 可选：添加上下文摘要
      if (options.includeSummary && messages.length > processedMessages.length + 5) {
        const droppedMessages = messages.slice(0, messages.length - processedMessages.length)
        const summary = await createContextSummary(droppedMessages)

        // 在处理后的消息前添加摘要
        processedMessages.unshift({
          role: "system",
          content: summary,
        })
      }
    }

    console.log(`Original messages: ${messages.length}, Processed messages: ${processedMessages.length}`)

    const result = streamText({
      model: deepseek("deepseek-chat"),
      messages: processedMessages,
      tools,
      // 可以添加更多配置
      maxTokens: 2000, // 限制响应长度
      temperature: 0.7,
    })

    const response = result.toDataStreamResponse()

    // 添加上下文信息到响应头
    response.headers.set("x-total-messages", messages.length.toString())
    response.headers.set("x-processed-messages", processedMessages.length.toString())
    response.headers.set("x-was-filtered", (messages.length !== processedMessages.length).toString())

    return response
  } catch (error) {
    console.error("Error in chat API route:", error)

    // 如果是MCP错误，尝试刷新一次
    if (error instanceof Error && error.message.includes("MCP")) {
      try {
        const mcpManager = MCPManager.getInstance()
        const tools = await mcpManager.refresh()

        // 重试时也要应用相同的上下文管理
        const processedMessages =
          messages.length > CONTEXT_CONFIG.maxMessages ? filterMessagesForContext(messages) : messages

        const result = streamText({
          model: deepseek("deepseek-chat"),
          messages: processedMessages,
          tools,
        })

        return result.toDataStreamResponse()
      } catch (retryError) {
        console.error("Retry failed:", retryError)
      }
    }

    return new Response(JSON.stringify({ error: "Failed to process your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
