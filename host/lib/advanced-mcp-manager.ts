import { experimental_createMCPClient } from "ai"

interface MCPConfig {
  cacheTimeout?: number
  maxRetries?: number
  retryDelay?: number
}

interface CachedMCPData {
  client: any
  tools: any
  lastUpdated: number
  isHealthy: boolean
}

class AdvancedMCPManager {
  private static instance: AdvancedMCPManager
  private cache: CachedMCPData | null = null
  private config: Required<MCPConfig>
  private isConnecting = false

  private constructor(config: MCPConfig = {}) {
    this.config = {
      cacheTimeout: config.cacheTimeout || 5 * 60 * 1000, // 5分钟
      maxRetries: config.maxRetries || 3,
      retryDelay: config.retryDelay || 1000, // 1秒
    }
  }

  static getInstance(config?: MCPConfig): AdvancedMCPManager {
    if (!AdvancedMCPManager.instance) {
      AdvancedMCPManager.instance = new AdvancedMCPManager(config)
    }
    return AdvancedMCPManager.instance
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private isCacheValid(): boolean {
    if (!this.cache) return false

    const now = Date.now()
    const isExpired = now - this.cache.lastUpdated > this.config.cacheTimeout

    return !isExpired && this.cache.isHealthy
  }

  async getToolsAndClient(): Promise<{ tools: any; client: any }> {
    // 如果缓存有效，直接返回
    if (this.isCacheValid()) {
      return {
        tools: this.cache!.tools,
        client: this.cache!.client,
      }
    }

    // 防止并发连接
    if (this.isConnecting) {
      // 等待其他连接完成
      while (this.isConnecting) {
        await this.sleep(100)
      }

      if (this.isCacheValid()) {
        return {
          tools: this.cache!.tools,
          client: this.cache!.client,
        }
      }
    }

    this.isConnecting = true

    try {
      let lastError: Error | null = null

      for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
        try {
          // 清理旧连接
          if (this.cache?.client) {
            await this.cache.client.close()
          }

          // 创建新连接
          const mcpClient = await experimental_createMCPClient({
            transport: {
              type: "sse",
              url: process.env.MCP_SERVER_URL as string,
            },
          })

          // 获取tools
          const tools = await mcpClient.tools()

          // 更新缓存
          this.cache = {
            client: mcpClient,
            tools,
            lastUpdated: Date.now(),
            isHealthy: true,
          }

          console.log(`MCP client connected successfully on attempt ${attempt}`)

          return {
            tools,
            client: mcpClient,
          }
        } catch (error) {
          lastError = error as Error
          console.error(`MCP connection attempt ${attempt} failed:`, error)

          if (attempt < this.config.maxRetries) {
            await this.sleep(this.config.retryDelay * attempt)
          }
        }
      }

      throw lastError || new Error("Failed to connect to MCP server")
    } finally {
      this.isConnecting = false
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.cache?.client) return false

      // 这里可以添加具体的健康检查逻辑
      // 比如调用一个简单的MCP方法来测试连接
      return true
    } catch (error) {
      console.error("MCP health check failed:", error)
      if (this.cache) {
        this.cache.isHealthy = false
      }
      return false
    }
  }

  async forceRefresh(): Promise<{ tools: any; client: any }> {
    if (this.cache?.client) {
      await this.cache.client.close()
    }
    this.cache = null
    return this.getToolsAndClient()
  }

  async cleanup(): Promise<void> {
    if (this.cache?.client) {
      await this.cache.client.close()
    }
    this.cache = null
  }
}

export default AdvancedMCPManager
