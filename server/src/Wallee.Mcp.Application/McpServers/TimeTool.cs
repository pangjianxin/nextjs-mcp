using ModelContextProtocol.Server;
using System;
using System.ComponentModel;

namespace Wallee.Mcp.McpServers;

[McpServerToolType]
public class TimeTool
{
    [McpServerTool, Description("获取一个城市的当前时间")]
    public DateTimeOffset GetCurrentTime(string city) => DateTimeOffset.Now;
}