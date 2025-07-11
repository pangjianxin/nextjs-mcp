"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
  role: "user" | "assistant" | "system"
  authorName: string
  timestamp: Date
  isStreaming?: boolean
  isComplete?: boolean
  usage?: TokenUsage
  modelId?: string
}

interface UseSSEChatOptions {
  initialMessages?: ChatMessage[]
}

interface ChatError {
  type: "AUTH_ERROR" | "SERVER_ERROR" | "NETWORK_ERROR" | "VALIDATION_ERROR" | "STREAM_ERROR"
  message: string
  statusCode?: number
  timestamp: Date
  details?: any
}

interface ErrorResponse {
  error: ChatError
}

export function useSSEChat(options: UseSSEChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState<ChatMessage | null>(null)
  const [error, setError] = useState<ChatError | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "error">("disconnected")

  const { data: session } = useSession()
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (options.initialMessages) {
      setMessages(options.initialMessages)
    }
  }, [options.initialMessages])

  // 清除消息
  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  // 清除错误状态
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // 处理错误
  const handleError = useCallback((errorData: ChatError) => {
    setError(errorData)
    setIsLoading(false)
    setCurrentStreamingMessage(null)
    setConnectionStatus("error")

    // 根据错误类型执行不同的处理逻辑
    switch (errorData.type) {
      case "AUTH_ERROR":
        // 可以在这里触发重新登录流程
        console.warn("Authentication error:", errorData.message)
        break
      case "NETWORK_ERROR":
        // 可以在这里实现重连逻辑
        console.warn("Network error:", errorData.message)
        break
      case "SERVER_ERROR":
        console.error("Server error:", errorData.message)
        break
      default:
        console.error("Unknown error:", errorData)
    }
  }, [])

  // 处理接收到的聊天消息
  const handleReceiveChat = useCallback((responseItem: AgentResponseItem) => {
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

  // 解析SSE格式的数据
  const parseSSEData = useCallback(
    (chunk: string) => {
      const messages = chunk.split("\n\n")

      for (const message of messages) {
        if (!message.trim()) continue

        const lines = message.split("\n")
        let data = ""

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith("data:")) {
            data = trimmedLine.substring(5).trim()

            if (data) {
              try {
                const parsedData = JSON.parse(data)

                // 检查是否是错误响应
                if (parsedData.error) {
                  const errorData: ChatError = {
                    ...parsedData.error,
                    timestamp: new Date(parsedData.error.timestamp || Date.now()),
                  }
                  handleError(errorData)
                  return
                }

                // 正常的聊天消息
                const responseItem: AgentResponseItem = parsedData
                handleReceiveChat(responseItem)
              } catch (parseError) {
                console.warn("Failed to parse SSE JSON:", data, parseError)
                handleError({
                  type: "STREAM_ERROR",
                  message: "数据解析错误",
                  timestamp: new Date(),
                  details: parseError,
                })
              }
            }
          }
        }
      }
    },
    [handleReceiveChat, handleError],
  )

  // 停止流式传输
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)
      setCurrentStreamingMessage(null)
      setConnectionStatus("disconnected")
    }
  }, [])

  // 发送消息并处理SSE流
  const sendMessage = useCallback(
    async (inputMessage: string) => {
      if (!inputMessage.trim()) return

      // 清除之前的错误
      clearError()
      setConnectionStatus("connected")

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
      setCurrentStreamingMessage(null)

      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      try {
        const response = await fetch(`/api/agent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            input: inputMessage,
          }),
          signal: abortController.signal,
        })

        if (!response.ok) {
          // 尝试解析错误响应
          try {
            const errorResponse: ErrorResponse = await response.json()
            handleError(errorResponse.error)
          } catch {
            // 如果无法解析错误响应，创建通用错误
            handleError({
              type: response.status === 401 ? "AUTH_ERROR" : "SERVER_ERROR",
              message: `HTTP ${response.status}: ${response.statusText}`,
              statusCode: response.status,
              timestamp: new Date(),
            })
          }
          return
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          handleError({
            type: "STREAM_ERROR",
            message: "无法建立数据流连接",
            timestamp: new Date(),
          })
          return
        }

        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            if (buffer.trim()) {
              parseSSEData(buffer)
            }
            setConnectionStatus("disconnected")
            break
          }

          buffer += decoder.decode(value, { stream: true })

          let boundary = buffer.indexOf("\n\n")
          while (boundary !== -1) {
            const completeMessage = buffer.substring(0, boundary + 2)
            buffer = buffer.substring(boundary + 2)
            parseSSEData(completeMessage)
            boundary = buffer.indexOf("\n\n")
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was aborted")
          setConnectionStatus("disconnected")
        } else {
          console.error("Error sending message:", error)
          handleError({
            type: "NETWORK_ERROR",
            message: "网络连接失败，请检查网络后重试",
            timestamp: new Date(),
            details: error,
          })
        }
      } finally {
        setIsLoading(false)
        setCurrentStreamingMessage(null)
        abortControllerRef.current = null
      }
    },
    [parseSSEData, clearError, handleError],
  )

  // 计算总token使用量
  const totalTokens = messages
    .filter((m) => m.role === "assistant" && m.usage)
    .reduce((sum, m) => sum + (m.usage?.totalTokenCount || 0), 0)

  return {
    // 状态
    messages,
    currentStreamingMessage,
    isConnected: connectionStatus === "connected",
    isLoading,
    totalTokens,
    error,
    connectionStatus,

    // 方法
    sendMessage,
    clearMessages,
    stopStreaming,
    clearError,
  }
}
