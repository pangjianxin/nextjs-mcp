using Microsoft.SemanticKernel;
using System.Collections.Concurrent;
using System.ComponentModel;

namespace Wallee.Mcp.Plugins
{
    public class MemoryTestPlugin
    {
        // 用于模拟记忆的静态字典（实际生产环境可替换为更合适的存储方式）
        private static readonly ConcurrentDictionary<string, string> Memory = new();

        [KernelFunction]
        [Description("记住名称和工号")]
        public string Remember(
          [Description("提供的名称信息")] string key,
          [Description("提供的工号信息")] string value)
        {
            Memory[key] = value;
            return $"已记住：{key} = {value}";
        }

        [KernelFunction]
        [Description("试图通过名称查找工号")]
        public string Recall([Description("提供的名称信息")] string key)
        {
            return Memory.TryGetValue(key, out var value)
                ? $"记忆内容：{key} = {value}"
                : $"未找到关于 {key} 的记忆。";
        }
    }
}
