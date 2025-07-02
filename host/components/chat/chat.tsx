"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  SendIcon,
  UserIcon,
  BotIcon,
  Settings,
  Info,
  MessageSquare,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CustomModal as ChatSettingModal } from "@/components/chat/chat-setting-modal";

interface ContextInfo {
  totalMessages: number;
  processedMessages: number;
  wasFiltered: boolean;
}

interface ContextSettings {
  maxMessages: number;
  keepSystemMessages: boolean;
  includeSummary: boolean;
}

export default function ChatPage() {
  const [contextInfo, setContextInfo] = useState<ContextInfo | null>(null);
  const [contextSettings, setContextSettings] = useState<ContextSettings>({
    maxMessages: 20,
    keepSystemMessages: true,
    includeSummary: false,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
    body: {
      options: {
        includeSummary: contextSettings.includeSummary,
        maxMessages: contextSettings.maxMessages,
        keepSystemMessages: contextSettings.keepSystemMessages,
      },
    },
    onResponse: async (response) => {
      // 从响应头中获取上下文信息
      const total = response.headers.get("x-total-messages");
      const processed = response.headers.get("x-processed-messages");
      const filtered = response.headers.get("x-was-filtered");

      if (total && processed && filtered) {
        setContextInfo({
          totalMessages: Number.parseInt(total),
          processedMessages: Number.parseInt(processed),
          wasFiltered: filtered === "true",
        });
      }
    },
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

  // 上下文指示器组件
  const ContextIndicator = () => {
    if (!contextInfo?.wasFiltered) return null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="gap-1 cursor-help">
              <Zap className="h-3 w-3" />
              {contextInfo.processedMessages}/{contextInfo.totalMessages}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-medium">上下文已优化</p>
              <p>保留了 {contextInfo.processedMessages} 条最相关的消息</p>
              <p className="text-xs text-muted-foreground mt-1">
                这有助于提高响应速度和质量
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>智能聊天助手</CardTitle>
              {messages.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {messages.length}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ContextIndicator />
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
                设置
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-[calc(80vh-140px)] text-center text-gray-500">
                  <div>
                    <BotIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">开始对话</p>
                    <p className="text-sm">发送消息开启人机对话</p>
                    {contextSettings.maxMessages < 20 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        当前限制: {contextSettings.maxMessages} 条消息
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4 pb-2">
                  {/* 如果有上下文过滤，显示提示 */}
                  {contextInfo?.wasFiltered && messages.length > 0 && (
                    <div className="flex justify-center">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-700">
                        <Info className="h-3 w-3 inline mr-1" />
                        为了优化性能，已智能筛选了{" "}
                        {contextInfo.processedMessages} 条最相关的消息
                      </div>
                    </div>
                  )}

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
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
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
            <Button
              type="submit"
              size="icon"
              disabled={isThinking || !input.trim()}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* 自定义设置模态框 */}
      <ChatSettingModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="上下文管理设置"
        description="调整这些设置来优化对话体验和性能"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="maxMessages">
              最大消息数量: {contextSettings.maxMessages}
            </Label>
            <Slider
              id="maxMessages"
              min={5}
              max={50}
              step={5}
              value={[contextSettings.maxMessages]}
              onValueChange={(value) =>
                setContextSettings((prev) => ({
                  ...prev,
                  maxMessages: value[0],
                }))
              }
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              超过此数量的消息将被智能过滤
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 pr-4">
              <Label htmlFor="keepSystem">保留系统消息</Label>
              <p className="text-xs text-muted-foreground">
                始终保留重要的系统指令
              </p>
            </div>
            <Switch
              id="keepSystem"
              checked={contextSettings.keepSystemMessages}
              onCheckedChange={(checked) =>
                setContextSettings((prev) => ({
                  ...prev,
                  keepSystemMessages: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 pr-4">
              <Label htmlFor="includeSummary">包含对话摘要</Label>
              <p className="text-xs text-muted-foreground">
                为长对话生成智能摘要
              </p>
            </div>
            <Switch
              id="includeSummary"
              checked={contextSettings.includeSummary}
              onCheckedChange={(checked) =>
                setContextSettings((prev) => ({
                  ...prev,
                  includeSummary: checked,
                }))
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSettingsOpen(false)}
            >
              关闭
            </Button>
            <Button
              size="sm"
              onClick={() => {
                // 这里可以添加保存逻辑
                setSettingsOpen(false);
              }}
            >
              保存设置
            </Button>
          </div>
        </div>
      </ChatSettingModal>
    </div>
  );
}
