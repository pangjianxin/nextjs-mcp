"use client";
import { useChat } from "@ai-sdk/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, UserIcon, BotIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
  });

  // 使用正确的状态值判断是否正在思考
  const isThinking = status === "submitted" || status === "streaming";

  // Add a ref to the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or when thinking status changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  console.log("Chat status:", status);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-[calc(80vh-140px)] text-center text-gray-500">
                  <div>
                    <BotIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>发送消息开启人机对话</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4 pb-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <Avatar
                          className={`size-8 mt-1 ${
                            message.role === "user" ? "ml-1" : "mr-1"
                          }`}
                        >
                          {message.role === "user" ? (
                            <UserIcon className="size-6" />
                          ) : (
                            <BotIcon className="size-6" />
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg px-3 py-2 text-sm ${
                            message.role === "user" ? "bg-muted" : "bg-muted"
                          }`}
                        >
                          {/* 使用ReactMarkdown渲染消息内容 */}
                          {(!message.parts || message.parts.length === 0) && (
                            <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          )}

                          {/* Display parts if available */}
                          {message.parts && message.parts.length > 0 && (
                            <div>
                              {message.parts.map((part, i) => {
                                switch (part.type) {
                                  case "text":
                                    return (
                                      <div
                                        key={i}
                                        className="prose prose-sm dark:prose-invert max-w-none break-words"
                                      >
                                        <ReactMarkdown>
                                          {part.text}
                                        </ReactMarkdown>
                                      </div>
                                    );
                                  case "source":
                                    return (
                                      <p
                                        key={i}
                                        className="text-xs text-blue-600 mt-1"
                                      >
                                        {part.source.url}
                                      </p>
                                    );
                                  case "reasoning":
                                    return (
                                      <div
                                        key={i}
                                        className="text-xs italic mt-1"
                                      >
                                        {part.reasoning}
                                      </div>
                                    );
                                  case "tool-invocation":
                                    return (
                                      <div
                                        key={i}
                                        className="mt-2 text-xs bg-gray-100 rounded-md p-2 overflow-x-auto"
                                      >
                                        <div className="font-mono">
                                          <span className="text-blue-600">
                                            工具调用:{" "}
                                          </span>
                                          {part.toolInvocation.toolName}
                                        </div>
                                        <div className="mt-1">
                                          {part.toolInvocation.state ===
                                          "result"
                                            ? Array.isArray(
                                                part.toolInvocation.result
                                                  .content
                                              )
                                              ? part.toolInvocation.result.content
                                                  .map((item: any) => item.text)
                                                  .join("")
                                              : JSON.stringify(
                                                  part.toolInvocation.result
                                                    .content
                                                )
                                            : part.toolInvocation.state}
                                        </div>
                                      </div>
                                    );
                                  case "file":
                                    return (
                                      <img
                                        key={i}
                                        className="mt-2 max-w-full rounded"
                                        src={`data:${part.mimeType};base64,${part.data}`}
                                        alt="Generated image"
                                      />
                                    );
                                  default:
                                    return null;
                                }
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* 添加思考中的加载指示器 */}
                  {isThinking && (
                    <div className="flex justify-start animate-pulse">
                      <div className="flex max-w-[80%] flex-row">
                        <Avatar className="h-8 w-8 mr-2">
                          <BotIcon className="h-4 w-4" />
                        </Avatar>
                        <div className="flex items-center space-x-2 rounded-lg bg-muted px-4 py-2.5 text-sm">
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <span className="text-xs text-gray-500 ml-1">
                            {status === "submitted" ? "准备中..." : "思考中..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Invisible div for scrolling to bottom */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="从这里开始..."
              disabled={isThinking}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isThinking}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
