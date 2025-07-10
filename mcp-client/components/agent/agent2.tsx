"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSSEChat } from "@/hooks/use-sse-chat";
import {
  Send,
  Square,
  Trash2,
  Bot,
  User,
  Zap,
  Copy,
  Check,
  Sparkles,
  Brain,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/sections/markdown-renderer";

// 科技感打字动画组件
function TypingAnimation() {
  return (
    <div className="flex space-x-2 items-center">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-cyan-400/80"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-blue-400/80"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-400/80"></div>
      </div>
      <div className="flex items-center gap-1">
        <Brain className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span className="text-sm bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
          AI神经网络处理中...
        </span>
      </div>
    </div>
  );
}

// 科技感消息气泡组件
function MessageBubble({ message, isUser }: { message: any; isUser: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 transition-all duration-700 transform mb-6",
        isUser ? "justify-end" : "justify-start",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && (
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 ring-2 ring-cyan-400/60 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-cyan-400/70">
            <Bot className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-black animate-pulse shadow-lg shadow-green-400/80"></div>
          {/* AI脉冲环 */}
          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 animate-ping"></div>
        </div>
      )}

      <div className="relative group max-w-[85%]">
        <div
          className={cn(
            "rounded-2xl px-6 py-4 transition-all duration-500 backdrop-blur-xl border-2",
            "hover:scale-[1.02] hover:shadow-2xl",
            isUser
              ? "bg-gradient-to-br from-blue-600/90 via-indigo-700/90 to-purple-800/90 text-white shadow-2xl shadow-blue-500/40 border-blue-400/60 hover:shadow-blue-400/60 hover:border-blue-300/80"
              : "bg-gradient-to-br from-gray-900/95 via-slate-800/95 to-gray-900/95 text-gray-100 shadow-2xl shadow-cyan-500/20 border-cyan-500/40 hover:border-cyan-400/60 hover:shadow-cyan-400/30",
            isHovered &&
              (isUser
                ? "ring-2 ring-blue-400/60 glow-blue"
                : "ring-2 ring-cyan-400/60 glow-cyan")
          )}
        >
          {/* 流式状态指示器 */}
          {message.isStreaming && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/80"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <Cpu className="w-3 h-3 text-cyan-400 animate-spin" />
                <span className="text-xs bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                  实时AI流式响应
                </span>
              </div>
            </div>
          )}

          {/* 消息内容 - 使用Markdown渲染 */}
          <div className="prose prose-invert prose-sm max-w-none">
            <MarkdownRenderer content={message.content} />
          </div>

          {/* 消息元数据 */}
          {message.usage && (
            <div className="mt-4 pt-3 border-t border-cyan-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Zap className="w-3 h-3 animate-pulse" />
                  <span className="font-bold">{message.usage.totalTokens}</span>
                  <span className="text-cyan-400">tokens</span>
                </div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-purple-400 font-medium">
                  {message.modelId}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          )}

          {/* 科技感装饰线条 */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        </div>

        {/* 炫酷的复制按钮 */}
        <div
          className={cn(
            "absolute -bottom-3 right-4 transition-all duration-300",
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-8 w-8 p-0 rounded-full backdrop-blur-xl border-2 transition-all duration-200 hover:scale-110",
              copied
                ? "bg-green-500/30 border-green-400/80 text-green-400 shadow-lg shadow-green-400/50"
                : "bg-gray-800/80 border-cyan-400/50 text-cyan-400 hover:bg-gray-700/80 hover:border-cyan-300/70 hover:shadow-lg hover:shadow-cyan-400/30"
            )}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {isUser && (
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/50 ring-2 ring-emerald-400/60 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-emerald-400/70">
            <User className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full border-2 border-black shadow-lg shadow-blue-400/80"></div>
          {/* 用户脉冲环 */}
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping"></div>
        </div>
      )}
    </div>
  );
}

export function SimpleChatInterface() {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    currentStreamingMessage,
    isLoading,
    totalTokens,
    sendMessage,
    clearMessages,
    stopStreaming,
  } = useSSEChat();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const allMessages = [...messages];
  if (currentStreamingMessage) {
    allMessages.push(currentStreamingMessage);
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div className="container mx-auto max-w-6xl h-full flex flex-col relative">
      {/* 超炫酷的AI背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-blue-600/10 to-transparent rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/20 via-pink-500/10 to-transparent rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent rounded-3xl"></div>

      {/* 动态光效 */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>

      {/* 科技网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] rounded-3xl"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* 超炫酷的AI标题区域 */}
        <div className="text-center py-6 border-b-2 border-cyan-500/30 bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-t-3xl shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/50 animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
              🤖 AI 超级智能助手
            </h1>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <Brain className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-purple-400/50 animate-ping [animation-delay:0.5s]"></div>
            </div>
          </div>
          <p className="text-cyan-300 text-base font-medium">
            🚀{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              智能对话
            </span>{" "}
            • ⚡{" "}
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              实时响应
            </span>{" "}
            • 📝{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Markdown支持
            </span>
          </p>
        </div>

        {/* 超炫酷的聊天区域 */}
        <Card className="flex-1 bg-gradient-to-br from-slate-900/50 via-gray-900/50 to-black/50 backdrop-blur-2xl border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden rounded-b-3xl border-t-0">
          {/* 科技感状态栏 */}
          <div className="flex items-center justify-between p-4 border-b-2 border-cyan-500/20 bg-gradient-to-r from-slate-900/70 via-gray-900/70 to-slate-900/70 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/80"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm text-cyan-300 font-bold">
                  🌐 神经网络在线
                </span>
              </div>
              <div className="h-6 w-px bg-gradient-to-b from-cyan-400/50 to-purple-400/50"></div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-sm text-purple-300 font-medium">
                  {allMessages.length} 条智能对话
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30 px-3 py-1">
                <Zap className="w-4 h-4 mr-2 text-yellow-400 animate-pulse" />
                <span className="font-bold text-yellow-300">
                  {totalTokens.toLocaleString()}
                </span>
                <span className="ml-1 text-cyan-300">Tokens</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200 hover:scale-110 border-2 border-red-400/30 hover:border-red-300/50 rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 消息列表 - 科技感滚动区域 */}
          <div className="flex-1 flex flex-col min-h-0">
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 scrollbar-cyber"
            >
              <div className="space-y-4">
                {allMessages.length === 0 && (
                  <div className="text-center py-20">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 flex items-center justify-center backdrop-blur-xl shadow-2xl shadow-cyan-500/30 border-2 border-cyan-400/50">
                        <Bot className="w-12 h-12 text-cyan-300" />
                      </div>
                      <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 animate-ping"></div>
                      <div className="absolute inset-0 rounded-3xl border-2 border-purple-400/30 animate-ping [animation-delay:0.5s]"></div>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                      🚀 启动AI智能对话
                    </h3>
                    <p className="text-cyan-200 max-w-md mx-auto text-lg leading-relaxed">
                      向AI助手提问任何问题，体验
                      <span className="text-purple-400 font-bold">
                        超级智能
                      </span>
                      对话的魅力。 支持
                      <span className="text-cyan-400 font-bold">
                        Markdown格式
                      </span>
                      ，
                      <span className="text-blue-400 font-bold">代码高亮</span>
                      等丰富功能。
                    </p>
                  </div>
                )}

                {allMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isUser={message.role === "user"}
                  />
                ))}

                {isLoading && !currentStreamingMessage && (
                  <div className="flex justify-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-pulse">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 animate-ping"></div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-900/95 via-gray-800/95 to-slate-900/95 border-2 border-cyan-500/40 rounded-2xl px-6 py-4 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
                        <TypingAnimation />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 超炫酷的输入区域 */}
            <div className="p-6 border-t-2 border-cyan-500/20 bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="🤖 输入你的消息，开启AI智能对话..."
                    disabled={isLoading}
                    className="bg-gradient-to-r from-gray-800/80 to-slate-800/80 border-2 border-cyan-500/40 text-white placeholder-cyan-300/70 focus:border-cyan-400/80 focus:ring-cyan-400/30 backdrop-blur-sm h-14 text-base rounded-2xl px-6 pr-16 shadow-2xl shadow-cyan-500/10 transition-all duration-200 hover:bg-gray-700/80 hover:border-cyan-400/60"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/80"></div>
                    <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                </div>

                {isLoading ? (
                  <Button
                    onClick={stopStreaming}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-2xl shadow-red-500/40 h-14 px-8 rounded-2xl transition-all duration-200 hover:scale-105 border-2 border-red-400/50 hover:border-red-300/70"
                  >
                    <Square className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-cyan-500/40 h-14 px-8 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-cyan-400/50 hover:border-cyan-300/70"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* 超炫酷的快捷建议 */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  {
                    text: "解释AI概念",
                    icon: "🧠",
                    gradient:
                      "from-cyan-500/20 to-blue-600/20 hover:from-cyan-400/30 hover:to-blue-500/30",
                    border: "border-cyan-400/40 hover:border-cyan-300/60",
                  },
                  {
                    text: "编写代码",
                    icon: "💻",
                    gradient:
                      "from-purple-500/20 to-pink-600/20 hover:from-purple-400/30 hover:to-pink-500/30",
                    border: "border-purple-400/40 hover:border-purple-300/60",
                  },
                  {
                    text: "翻译文本",
                    icon: "🌐",
                    gradient:
                      "from-green-500/20 to-emerald-600/20 hover:from-green-400/30 hover:to-emerald-500/30",
                    border: "border-green-400/40 hover:border-green-300/60",
                  },
                  {
                    text: "创意灵感",
                    icon: "💡",
                    gradient:
                      "from-yellow-500/20 to-orange-600/20 hover:from-yellow-400/30 hover:to-orange-500/30",
                    border: "border-yellow-400/40 hover:border-yellow-300/60",
                  },
                ].map((suggestion) => (
                  <button
                    key={suggestion.text}
                    onClick={() => setInputMessage(suggestion.text)}
                    className={cn(
                      "px-5 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm shadow-lg border-2",
                      `bg-gradient-to-r ${suggestion.gradient}`,
                      `${suggestion.border}`,
                      "text-white hover:shadow-xl"
                    )}
                  >
                    <span className="mr-2 text-base">{suggestion.icon}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
