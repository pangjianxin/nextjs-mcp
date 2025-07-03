using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Agents.Orchestration.GroupChat;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System;
using System.Threading.Tasks;
using Volo.Abp.Modularity;
using Wallee.Mcp.Services;

namespace Wallee.Mcp.Agents
{
    public class McpAgentsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();
            ConfigureSemanticKernel(context, configuration);

            context.Services.AddSingleton<ChatContextService>();
        }

        private void ConfigureSemanticKernel(ServiceConfigurationContext context, IConfiguration configuration)
        {

            context.Services.AddKernel().AddOpenAIChatCompletion(
                    modelId: configuration["DeepSeek:ModelId"]!,
                    endpoint: new Uri(configuration["DeepSeek:EndPoint"]!),
                    apiKey: configuration["DeepSeek:ApiKey"]!,
                    serviceId: "deepseek-chat"
            );

            context.Services.AddKeyedScoped<ChatCompletionAgent>("document", (sp, key) =>
            {
                var kernel = sp.GetRequiredService<Kernel>();
                var agent = new ChatCompletionAgent()
                {
                    Instructions = """

                    """,
                    Name = "x1",
                    Kernel = kernel,
                    Arguments = new KernelArguments(new OpenAIPromptExecutionSettings()
                    {
                        ServiceId = "deepseek-chat",
                        FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
                    })
                };

                //agent.Kernel.Plugins.AddFromObject();


#pragma warning disable SKEXP0110 // 类型仅用于评估，在将来的更新中可能会被更改或删除。取消此诊断以继续。
                var groupChat = new GroupChatOrchestration(new RoundRobinGroupChatManager(), agent)
                {
                    ResponseCallback = (response) =>
                     {
                         // Handle the response from the agent
#pragma warning disable SKEXP0001 // 类型仅用于评估，在将来的更新中可能会被更改或删除。取消此诊断以继续。
                         Console.WriteLine($"Response from agent encoding: {response.Encoding},{response.AuthorName}");
#pragma warning restore SKEXP0001 // 类型仅用于评估，在将来的更新中可能会被更改或删除。取消此诊断以继续。
                         return ValueTask.CompletedTask;
                     },
                };
#pragma warning restore SKEXP0110 // 类型仅用于评估，在将来的更新中可能会被更改或删除。取消此诊断以继续。

                return agent;
            });
        }
    }
}
