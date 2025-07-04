using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System;
using Volo.Abp.Modularity;
using Wallee.Mcp.Plugins;

namespace Wallee.Mcp
{
    [DependsOn(
        typeof(McpDomainModule),
        typeof(McpApplicationContractsModule)
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
            context.Services.AddKernel().AddOpenAIChatCompletion(
                    modelId: configuration["DeepSeek:ModelId"]!,
                    endpoint: new Uri(configuration["DeepSeek:EndPoint"]!),
                    apiKey: configuration["DeepSeek:ApiKey"]!,
                    serviceId: "deepseek-chat"
            );

            context.Services.AddKeyedScoped("enterprise-document-agent", (sp, key) =>
            {
                var agentKernel = sp.GetRequiredService<Kernel>().Clone();

                agentKernel.Plugins.AddFromType<CorporateInfoPlugin>("corporatePlugin");

                var agent = new ChatCompletionAgent()
                {
                    Name = "CorporateAgent",
                    Instructions = """
                    You are an agent designed to query and retrieve information from a single GitHub repository in a read-only manner.
                    You are also able to access the profile of the active user.

                    Use the current date and time to provide up-to-date details or time-sensitive responses.

                    The repository you are querying is a public repository with the following name: {{$repository}}

                    The current date and time is: {{$now}}. 
                    """,
                    Kernel = agentKernel,

                    Arguments = new KernelArguments(new OpenAIPromptExecutionSettings()
                    {
                        ServiceId = "deepseek-chat",
                        FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
                    })
                };
                return agent;
            });


            context.Services.AddKeyedScoped("enterprise-document-agent", (sp, key) =>
            {

                var agentKernel = sp.GetRequiredService<Kernel>().Clone();

                agentKernel.Plugins.AddFromType<CorporateInfoPlugin>("corporatePlugin");

                var agent = new ChatCompletionAgent()
                {
                    Name = "CorporateAgent",
                    Instructions = """
                    You are an agent designed to query and retrieve information from a single GitHub repository in a read-only manner.
                    You are also able to access the profile of the active user.

                    Use the current date and time to provide up-to-date details or time-sensitive responses.

                    The repository you are querying is a public repository with the following name: {{$repository}}

                    The current date and time is: {{$now}}. 
                    """,
                    Kernel = agentKernel,

                    Arguments = new KernelArguments(new OpenAIPromptExecutionSettings()
                    {
                        ServiceId = "deepseek-chat",
                        FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
                    }),

                    //HistoryReducer = new ChatHistoryTruncationReducer(5)
                };
                return agent;
            });
        }
    }
}
