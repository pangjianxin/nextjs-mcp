"use client"

import { useState, useEffect, useCallback } from "react"
import { type HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { useSession } from "next-auth/react"

interface TokenUsage {
  outputTokenCount: number
  inputTokenCount: number
  totalTokenCount: number
  outputTokenDetails?: any
  inputTokenDetails?: {
    audioTokenCount: number
    cachedTokenCount: number
  }
}

interface StreamingChatMessageContent {
  content: string
  authorName: string
  role: {
    label: string
  }
  choiceIndex: number
  modelId: string
  metadata: {
    CompletionId: string
    CreatedAt: string
    SystemFingerprint: string
    RefusalUpdate: string | null
    Usage: TokenUsage
    FinishReason: string
  }
}

interface AgentResponseItem {
  message: StreamingChatMessageContent
  thread: {
    id: string
    isDeleted: boolean
    aiContextProviders: {
      providers: any[]
    }
  }
}

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  authorName: string
  timestamp: Date
  isStreaming?: boolean
  isComplete?: boolean
  usage?: TokenUsage
  modelId?: string
}

interface UseSignalRChatOptions {
  hubUrl: string
}

export function useSignalRChat({ hubUrl }: UseSignalRChatOptions) {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState<ChatMessage | null>(null)

  const { data: session } = useSession()

  // 建立SignalR连接
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: async () => {
          return session?.accessToken as string
        },
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    setConnection(newConnection)

    return () => {
      if (newConnection) {
        newConnection.stop()
      }
    }
  }, [hubUrl, session?.accessToken])

  // 启动连接和事件处理
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected")
          setIsConnected(true)
        })
        .catch((err) => {
          console.error("SignalR Connection Error: ", err)
          setIsConnected(false)
        })

      connection.onclose(() => {
        setIsConnected(false)
        console.log("SignalR Disconnected")
      })

      connection.onreconnected(() => {
        setIsConnected(true)
        console.log("SignalR Reconnected")
      })
    }
  }, [connection])

  // 处理流式消息
  const handleStreamingMessage = useCallback((responseItem: AgentResponseItem) => {
    const { message } = responseItem

    setCurrentStreamingMessage((prev) => {
      // 过滤掉null、undefined或空字符串的内容
      const newContent = message.content || ""
      const existingContent = prev ? prev.content : ""

      const newMessage: ChatMessage = {
        id: message.metadata.CompletionId,
        content: existingContent + newContent,
        role: message.role.label as "user" | "assistant",
        authorName: message.authorName,
        timestamp: new Date(message.metadata.CreatedAt),
        isStreaming: message.metadata.FinishReason !== "Stop",
        isComplete: message.metadata.FinishReason === "Stop",
        usage: message.metadata.Usage,
        modelId: message.modelId,
      }

      // 如果消息完成，将其添加到消息列表并清除当前流式消息
      if (message.metadata.FinishReason === "Stop") {
        setMessages((prevMessages) => {
          const existingIndex = prevMessages.findIndex((m) => m.id === newMessage.id)
          if (existingIndex >= 0) {
            const updatedMessages = [...prevMessages]
            updatedMessages[existingIndex] = newMessage
            return updatedMessages
          }
          return [...prevMessages, newMessage]
        })
        setIsLoading(false)
        return null
      }

      return newMessage
    })
  }, [])

  // 发送消息
  const sendMessage = useCallback(
    async (inputMessage: string) => {
      if (!inputMessage.trim() || !connection || !isConnected) return

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: inputMessage,
        role: "user",
        authorName: "User",
        timestamp: new Date(),
        isComplete: true,
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // 调用SignalR的chat方法，并处理流式响应
        const stream = connection.stream<AgentResponseItem>("chat", inputMessage)

        stream.subscribe({
          next: handleStreamingMessage,
          error: (err) => {
            console.error("Stream error:", err)
            setIsLoading(false)
            setCurrentStreamingMessage(null)
          },
          complete: () => {
            console.log("Stream completed")
            setIsLoading(false)
            setCurrentStreamingMessage(null)
          },
        })
      } catch (error) {
        console.error("Error sending message:", error)
        setIsLoading(false)
      }
    },
    [connection, isConnected, handleStreamingMessage],
  )

  // 清空消息
  const clearMessages = useCallback(() => {
    setMessages([])
    setCurrentStreamingMessage(null)
  }, [])

  // 计算总token使用量
  const totalTokens = messages
    .filter((m) => m.role === "assistant" && m.usage)
    .reduce((sum, m) => sum + (m.usage?.totalTokenCount || 0), 0)

  return {
    // 状态
    messages,
    currentStreamingMessage,
    isConnected,
    isLoading,
    totalTokens,

    // 方法
    sendMessage,
    clearMessages,
  }
}
