import { experimental_createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

class MCPManager {
  private static instance: MCPManager;
  private client: any = null;
  private tools: any = null;
  private lastUpdated = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5分钟

  private constructor() {}

  static getInstance(): MCPManager {
    if (!MCPManager.instance) {
      MCPManager.instance = new MCPManager();
    }
    return MCPManager.instance;
  }

  async getTools() {
    const now = Date.now();

    // 如果缓存还有效，直接返回
    if (this.tools && now - this.lastUpdated < this.CACHE_DURATION) {
      return this.tools;
    }

    try {
      // 关闭旧连接
      if (this.client) {
        await this.client.close();
      }

      // 首先尝试StreamableHTTPClientTransport
      try {
        console.log("Trying StreamableHTTPClientTransport...");
        const transport = new StreamableHTTPClientTransport(
          new URL(process.env.MCP_SERVER_URL as string)
        );

        this.client = await experimental_createMCPClient({
          transport,
        });

        this.tools = await this.client.tools();
        this.lastUpdated = now;

        console.log("MCP tools refreshed with StreamableHTTP");
        return this.tools;
      } catch (streamableError) {
        console.warn(
          "StreamableHTTP failed, falling back to SSE:",
          streamableError
        );

        // 回退到SSE传输
        this.client = await experimental_createMCPClient({
          transport: {
            type: "sse",
            url: process.env.MCP_SERVER_URL as string,
          },
        });

        this.tools = await this.client.tools();
        this.lastUpdated = now;

        console.log("MCP tools refreshed with SSE");
        return this.tools;
      }
    } catch (error) {
      console.error("Failed to get MCP tools:", error);
      throw error;
    }
  }

  // 强制刷新
  async refresh() {
    this.lastUpdated = 0;
    return this.getTools();
  }
}

export default MCPManager;
