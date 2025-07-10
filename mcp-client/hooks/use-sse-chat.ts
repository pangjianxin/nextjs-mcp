"use client";

import { useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";

interface TokenUsage {
  outputTokenCount: number;
  inputTokenCount: number;
  totalTokenCount: number;
  outputTokenDetails?: any;
  inputTokenDetails?: {
    audioTokenCount: number;
    cachedTokenCount: number;
  };
}

interface StreamingChatMessageContent {
  content: string;
  authorName: string;
  role: {
    label: string;
  };
  choiceIndex: number;
  modelId: string;
  metadata: {
    CompletionId: string;
    CreatedAt: string;
    SystemFingerprint: string;
    RefusalUpdate: string | null;
    Usage: TokenUsage;
    FinishReason: string;
  };
}

interface AgentResponseItem {
  message: StreamingChatMessageContent;
  thread: {
    id: string;
    isDeleted: boolean;
    aiContextProviders: {
      providers: any[];
    };
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  authorName: string;
  timestamp: Date;
  isStreaming?: boolean;
  isComplete?: boolean;
  usage?: TokenUsage;
  modelId?: string;
}

type UseSSEChatOptions = {};

export function useSSEChat(options: UseSSEChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] =
    useState<ChatMessage | null>(null);

  const { data: session } = useSession();
  const abortControllerRef = useRef<AbortController | null>(null);

  // 处理接收到的聊天消息
  const handleReceiveChat = useCallback((responseItem: AgentResponseItem) => {
    const { message } = responseItem;

    setCurrentStreamingMessage((prev) => {
      // 过滤掉null、undefined或空字符串的内容
      const newContent = message.content || "";
      const existingContent = prev ? prev.content : "";

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
      };

      // 如果消息完成，将其添加到消息列表并清除当前流式消息
      if (message.metadata.FinishReason === "Stop") {
        setMessages((prevMessages) => {
          const existingIndex = prevMessages.findIndex(
            (m) => m.id === newMessage.id
          );
          if (existingIndex >= 0) {
            const updatedMessages = [...prevMessages];
            updatedMessages[existingIndex] = newMessage;
            return updatedMessages;
          }
          return [...prevMessages, newMessage];
        });
        setIsLoading(false);
        return null;
      }

      return newMessage;
    });
  }, []);

  // 解析SSE格式的数据
  const parseSSEData = useCallback(
    (chunk: string) => {
      // 按照 \n\n 分割消息
      const messages = chunk.split("\n\n");

      for (const message of messages) {
        if (!message.trim()) continue;

        // 处理每一行
        const lines = message.split("\n");
        let data = "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data:")) {
            // 提取 data: 后面的JSON数据
            data = trimmedLine.substring(5).trim();

            if (data) {
              try {
                const responseItem: AgentResponseItem = JSON.parse(data);
                handleReceiveChat(responseItem);
              } catch (parseError) {
                console.warn("Failed to parse SSE JSON:", data, parseError);
              }
            }
          }
          // 可以在这里处理其他SSE事件类型，如 event:, id:, retry: 等
        }
      }
    },
    [handleReceiveChat]
  );

  // 发送消息并处理SSE流
  const sendMessage = useCallback(
    async (inputMessage: string) => {
      if (!inputMessage.trim()) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: inputMessage,
        role: "user",
        authorName: "User",
        timestamp: new Date(),
        isComplete: true,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setCurrentStreamingMessage(null);

      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        // 调用Next.js API route而不是直接调用ASP.NET Core API
        const response = await fetch(`/api/agent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            input: inputMessage,
            // 可以在这里添加其他需要发送的数据
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response body reader available");
        }

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // 处理缓冲区中剩余的数据
            if (buffer.trim()) {
              parseSSEData(buffer);
            }
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          // 查找完整的SSE消息（以 \n\n 结尾）
          let boundary = buffer.indexOf("\n\n");
          while (boundary !== -1) {
            const completeMessage = buffer.substring(0, boundary + 2);
            buffer = buffer.substring(boundary + 2);

            // 解析完整的SSE消息
            parseSSEData(completeMessage);

            // 查找下一个完整消息
            boundary = buffer.indexOf("\n\n");
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error("Error sending message:", error);
        }
        setIsLoading(false);
        setCurrentStreamingMessage(null);
      } finally {
        abortControllerRef.current = null;
      }
    },
    [parseSSEData]
  );

  // 停止当前的流式请求
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setCurrentStreamingMessage(null);
    }
  }, []);

  // 清空消息
  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentStreamingMessage(null);
    stopStreaming();
  }, [stopStreaming]);

  // 计算总token使用量
  const totalTokens = messages
    .filter((m) => m.role === "assistant" && m.usage)
    .reduce((sum, m) => sum + (m.usage?.totalTokenCount || 0), 0);

  return {
    // 状态
    messages,
    currentStreamingMessage,
    isConnected: true, // SSE doesn't have a persistent connection state like SignalR
    isLoading,
    totalTokens,

    // 方法
    sendMessage,
    clearMessages,
    stopStreaming,
  };
}
