using ModelContextProtocol.Server;
using System;
using System.ComponentModel;

namespace Wallee.Mcp.McpServers;

[McpServerToolType]
public class TimeTool
{
    [McpServerTool, Description("Get the current time for a city")]
    public string GetCurrentTime(string city) =>
        $"It is {DateTime.Now.Hour}:{DateTime.Now.Minute} in {city}.";
}