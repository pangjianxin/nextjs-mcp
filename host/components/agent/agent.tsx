"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  type HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, Circle, Zap } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";

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

interface ChatMessage {
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

interface SignalRChatProps {
  hubUrl: string;
  className?: string;
}

export function SignalRChat({ hubUrl, className = "" }: SignalRChatProps) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] =
    useState<ChatMessage | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 建立SignalR连接
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [hubUrl]);

  // 启动连接
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected");
          setIsConnected(true);
        })
        .catch((err) => {
          console.error("SignalR Connection Error: ", err);
          setIsConnected(false);
        });

      connection.onclose(() => {
        setIsConnected(false);
        console.log("SignalR Disconnected");
      });

      connection.onreconnected(() => {
        setIsConnected(true);
        console.log("SignalR Reconnected");
      });
    }
  }, [connection]);

  // 处理流式消息
  const handleStreamingMessage = useCallback(
    (responseItem: AgentResponseItem) => {
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
    },
    []
  );

  // 发送消息
  const sendMessage = async () => {
    if (!inputMessage.trim() || !connection || !isConnected) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      authorName: "User",
      timestamp: new Date(),
      isComplete: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // 调用SignalR的chat方法，并处理流式响应
      const stream = connection.stream<AgentResponseItem>("chat", inputMessage);

      stream.subscribe({
        next: handleStreamingMessage,
        error: (err) => {
          console.error("Stream error:", err);
          setIsLoading(false);
          setCurrentStreamingMessage(null);
        },
        complete: () => {
          console.log("Stream completed");
          setIsLoading(false);
          setCurrentStreamingMessage(null);
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  // 处理回车发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamingMessage, scrollToBottom]);

  // 格式化token数量
  const formatTokenCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div
      className={`flex flex-col w-4xl h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 ${className}`}
    >
      {/* 头部 */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                AI Assistant
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isConnected ? "在线" : "离线"} • 智能助手
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Circle
              className={`h-2 w-2 ${
                isConnected
                  ? "fill-green-500 text-green-500"
                  : "fill-red-500 text-red-500"
              }`}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isConnected ? "已连接" : "未连接"}
            </span>
          </div>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                开始对话
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                向我提问任何问题，我会尽力帮助你
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 items-start animate-in slide-in-from-bottom-2 duration-300 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`group ${
                  message.role === "user"
                    ? "order-first max-w-[70%]"
                    : "max-w-[80%]"
                }`}
              >
                <div
                  className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto"
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <MarkdownRenderer content={message.content} />
                    </div>
                  )}

                  {/* 消息尾巴 */}
                  <div
                    className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                      message.role === "user"
                        ? "-right-1 bg-gradient-to-br from-blue-500 to-blue-600"
                        : "-left-1 bg-white dark:bg-slate-800 border-l border-b border-slate-200 dark:border-slate-700"
                    }`}
                  />
                </div>

                <div
                  className={`flex items-center gap-2 mt-2 px-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* Token使用情况 - 只显示AI消息的token信息 */}
                  {message.role === "assistant" &&
                    message.usage &&
                    message.isComplete && (
                      <>
                        <span className="text-xs text-slate-300 dark:text-slate-600">
                          •
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <Zap className="h-3 w-3" />
                          <span
                            title={`输入: ${message.usage.inputTokenCount} | 输出: ${message.usage.outputTokenCount}`}
                          >
                            {formatTokenCount(message.usage.totalTokenCount)}{" "}
                            tokens
                          </span>
                        </div>
                        {message.modelId && (
                          <>
                            <span className="text-xs text-slate-300 dark:text-slate-600">
                              •
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              {message.modelId}
                            </span>
                          </>
                        )}
                      </>
                    )}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-blue-200 dark:ring-blue-800">
                  <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-700 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* 当前流式消息 */}
          {currentStreamingMessage && (
            <div className="flex gap-4 items-start animate-in slide-in-from-bottom-2 duration-300">
              <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div className="max-w-[80%]">
                <div className="relative px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MarkdownRenderer
                      content={currentStreamingMessage.content}
                    />
                  </div>

                  {currentStreamingMessage.isStreaming && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        正在输入...
                      </span>
                    </div>
                  )}

                  {/* 消息尾巴 */}
                  <div className="absolute top-3 -left-1 w-3 h-3 bg-white dark:bg-slate-800 border-l border-b border-slate-200 dark:border-slate-700 transform rotate-45" />
                </div>

                <div className="flex items-center gap-2 mt-2 px-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {currentStreamingMessage.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* 流式消息的token信息 - 只在完成时显示 */}
                  {currentStreamingMessage.usage &&
                    currentStreamingMessage.isComplete && (
                      <>
                        <span className="text-xs text-slate-300 dark:text-slate-600">
                          •
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <Zap className="h-3 w-3" />
                          <span
                            title={`输入: ${currentStreamingMessage.usage.inputTokenCount} | 输出: ${currentStreamingMessage.usage.outputTokenCount}`}
                          >
                            {formatTokenCount(
                              currentStreamingMessage.usage.totalTokenCount
                            )}{" "}
                            tokens
                          </span>
                        </div>
                        {currentStreamingMessage.modelId && (
                          <>
                            <span className="text-xs text-slate-300 dark:text-slate-600">
                              •
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              {currentStreamingMessage.modelId}
                            </span>
                          </>
                        )}
                      </>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* 加载指示器 */}
          {isLoading && !currentStreamingMessage && (
            <div className="flex gap-4 items-start animate-in slide-in-from-bottom-2 duration-300">
              <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  AI正在思考...
                </span>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "输入消息..." : "连接中..."}
                disabled={!isConnected || isLoading}
                className="min-h-[48px] pr-12 rounded-2xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={!isConnected || !inputMessage.trim() || isLoading}
              size="icon"
              className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2 px-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              按 Enter 发送消息，Shift + Enter 换行
            </p>
            {messages.length > 0 && (
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span>{messages.length} 条消息</span>
                {/* 显示总token使用量 */}
                {(() => {
                  const totalTokens = messages
                    .filter((m) => m.role === "assistant" && m.usage)
                    .reduce(
                      (sum, m) => sum + (m.usage?.totalTokenCount || 0),
                      0
                    );
                  return totalTokens > 0 ? (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>总计 {formatTokenCount(totalTokens)} tokens</span>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
