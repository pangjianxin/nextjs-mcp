using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.Modularity;
using Wallee.Mcp.Plugins;

namespace Wallee.Mcp
{
    [DependsOn(
        typeof(McpDomainModule),
        typeof(McpApplicationContractsModule),
        typeof(AbpAspNetCoreSignalRModule)
        )]
    public class McpAgentsModule : AbpModule
    {

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();
            ConfigureSemanticKernel(context, configuration);
        }

        private void ConfigureSemanticKernel(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddKernel()
                .AddOpenAIChatCompletion(
                    modelId: configuration["DeepSeek:ModelId"]!,
                    endpoint: new Uri(configuration["DeepSeek:EndPoint"]!),
                    apiKey: configuration["DeepSeek:ApiKey"]!,
                    serviceId: "deepseek-chat");

            context.Services.AddKeyedTransient("memory-test-agent", (sp, key) =>
            {
                var agentKernel = sp.GetRequiredService<Kernel>().Clone();
                var chatService = sp.GetRequiredKeyedService<IChatCompletionService>("deepseek-chat");

                agentKernel.Plugins.AddFromType<MemoryTestPlugin>("memoryTestPlugin");

                var agent = new ChatCompletionAgent()
                {
                    Name = "ChatAgent",
                    Instructions = """
                    请记住：我的工号是 12345。
                    #（调用 memoryTestPlugin.Remember，key=工号，value=12345）
                    如果你收到一个姓名和工号的请求，请先检查 memoryTestPlugin 是否已缓存该姓名对应的工号。
                    #（调用 memoryTestPlugin.Recall，key=姓名）
                    如果缓存中存在该姓名的工号，直接返回该工号。
                    如果缓存中没有该姓名的工号，请调用 memoryTestPlugin.Remember 方法将该姓名和工号添加到缓存中。
                    #（调用 memoryTestPlugin.Remember，key=姓名，value=工号）
                    然后返回该工号。
                    #（调用 memoryTestPlugin.Recall，key=工号）
                    """,
                    Kernel = agentKernel,

                    Arguments = new KernelArguments(new OpenAIPromptExecutionSettings()
                    {
                        ServiceId = "deepseek-chat",
                        FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
                    }),

                    //HistoryReducer = new ChatHistoryTruncationReducer(3, 3)
                    HistoryReducer = new ChatHistorySummarizationReducer(chatService, 3, 3)
                };
                return agent;
            });
        }
    }
}
