import type { CoreMessage } from "ai";

export interface ContextConfig {
  maxMessages: number;
  maxTokens: number;
  keepSystemMessages: boolean;
  keepRecentMessages: number;
  summaryThreshold: number;
}

export class ContextManager {
  private config: ContextConfig;

  constructor(config: Partial<ContextConfig> = {}) {
    this.config = {
      maxMessages: 20,
      maxTokens: 4000,
      keepSystemMessages: true,
      keepRecentMessages: 10,
      summaryThreshold: 30,
      ...config,
    };
  }

  // 智能上下文管理
  manageContext(messages: CoreMessage[]): {
    processedMessages: CoreMessage[];
    wasFiltered: boolean;
    summary?: string;
  } {
    if (messages.length <= this.config.maxMessages) {
      return {
        processedMessages: messages,
        wasFiltered: false,
      };
    }

    // 分析消息重要性
    const importantMessages = this.identifyImportantMessages(messages);
    const recentMessages = messages.slice(-this.config.keepRecentMessages);

    // 合并重要消息和最近消息（去重）
    const messageIds = new Set();
    const processedMessages: CoreMessage[] = [];

    // 添加系统消息
    if (this.config.keepSystemMessages) {
      messages
        .filter((msg) => msg.role === "system")
        .forEach((msg) => {
          const id = this.getMessageId(msg);
          if (!messageIds.has(id)) {
            messageIds.add(id);
            processedMessages.push(msg);
          }
        });
    }

    // 添加重要消息
    importantMessages.forEach((msg) => {
      const id = this.getMessageId(msg);
      if (!messageIds.has(id)) {
        messageIds.add(id);
        processedMessages.push(msg);
      }
    });

    // 添加最近消息
    recentMessages.forEach((msg) => {
      const id = this.getMessageId(msg);
      if (!messageIds.has(id)) {
        messageIds.add(id);
        processedMessages.push(msg);
      }
    });

    // 按原始顺序排序
    const sortedMessages = this.sortMessagesByOriginalOrder(
      processedMessages,
      messages
    );

    return {
      processedMessages: sortedMessages,
      wasFiltered: true,
    };
  }

  // 识别重要消息（包含关键词、问题、错误等）
  private identifyImportantMessages(messages: CoreMessage[]): CoreMessage[] {
    const importantKeywords = [
      "error",
      "problem",
      "issue",
      "help",
      "how to",
      "what is",
      "错误",
      "问题",
      "帮助",
      "如何",
      "什么是",
    ];

    return messages.filter((message) => {
      const content =
        typeof message.content === "string"
          ? message.content.toLowerCase()
          : JSON.stringify(message.content).toLowerCase();

      // 检查是否包含重要关键词
      const hasImportantKeywords = importantKeywords.some((keyword) =>
        content.includes(keyword.toLowerCase())
      );

      // 检查是否是问题（以问号结尾）
      const isQuestion = content.includes("?") || content.includes("？");

      // 检查是否是长消息（可能包含重要信息）
      const isLongMessage = content.length > 200;

      return hasImportantKeywords || isQuestion || isLongMessage;
    });
  }

  private getMessageId(message: CoreMessage): string {
    // 简单的消息ID生成，实际应用中可能需要更复杂的逻辑
    const content =
      typeof message.content === "string"
        ? message.content
        : JSON.stringify(message.content);
    return `${message.role}-${content.slice(0, 50)}`;
  }

  private sortMessagesByOriginalOrder(
    processedMessages: CoreMessage[],
    originalMessages: CoreMessage[]
  ): CoreMessage[] {
    const orderMap = new Map();
    originalMessages.forEach((msg, index) => {
      orderMap.set(this.getMessageId(msg), index);
    });

    return processedMessages.sort((a, b) => {
      const orderA = orderMap.get(this.getMessageId(a)) ?? 0;
      const orderB = orderMap.get(this.getMessageId(b)) ?? 0;
      return orderA - orderB;
    });
  }

  // 估算token数量
  estimateTokens(messages: CoreMessage[]): number {
    return messages.reduce((total, message) => {
      const content =
        typeof message.content === "string"
          ? message.content
          : JSON.stringify(message.content);
      return total + Math.ceil(content.length * 0.25);
    }, 0);
  }
}
