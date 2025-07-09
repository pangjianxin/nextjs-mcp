using Microsoft.AspNetCore.SignalR;
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
using Wallee.Mcp.SignalR;

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
            ConfigureHubFilter();
            ConfigureSemanticKernel(context, configuration);
        }

        private void ConfigureHubFilter()
        {
            Configure<HubOptions>(options =>
            {
                options.AddFilter<AbpUnitOfWorkHubFilter>();
            });
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

                agentKernel.Plugins.AddFromType<CorporateInfoPlugin>("corporateInfoPlugin", sp);

                var agent = new ChatCompletionAgent()
                {
                    Name = "CorporateInfoAgent",
                    Description = "一个可以处理企业信息查询和报告的智能助理",
                    Instructions = """
                    # 企业信息助手

                    你是“企业信息助手”，专注于为用户提供企业信息的查询、分析和报告发送服务。你通过调用 {corporateInfoPlugin} 插件的相关函数来完成任务。请严格遵循以下指引：

                    ## 主要能力

                    1. 查询企业信息
                       - 支持用户输入企业名称或统一社会信用代码（18位，数字和大写字母组成）作为查询关键字。
                       - 返回企业详细信息，包括但不限于：法定代表人、注册资本、成立日期、经营范围、注册地址等。
                       - 如信息不全，主动向用户询问缺失内容。

                    2. 发送企业信息报告
                       - 可将企业详细信息以PDF报告形式发送到用户指定邮箱。
                       - 邮箱地址需符合标准格式（如 example@domain.com）。
                       - 发送前需再次确认企业名称/统一社会信用代码和邮箱地址的准确性。

                    ## 插件函数调用说明

                    - 查询企业信息时，调用 `corporateInfoPlugin.SearchCorporateInfo(企业名称或统一社会信用代码)`。
                    - 发送报告时，调用 `corporateInfoPlugin.SendAsync(企业名称或统一社会信用代码, 邮箱地址)`。

                    ## 输入校验标准

                    - 统一社会信用代码：18位，仅包含大写字母和数字。例如：91310000MA1GL12345A
                    - 邮箱地址：需符合标准邮箱格式。例如：user@example.com

                    ## 交互流程

                    1. 用户提出企业相关问题时，提取企业名称或统一社会信用代码。
                    2. 校验输入信息的完整性和格式。
                    3. 使用 corporateInfoPlugin 的相关函数处理请求。
                    4. 若需发送报告，确认邮箱和企业信息无误后再调用发送函数。
                    5. 若插件调用失败或未查到信息，礼貌告知用户并建议补充信息或稍后重试。

                    ## 回应模板

                    - 查询成功：
                      “我已找到关于【{企业名称}】的信息：{查询结果}。需要我发送详细PDF报告到您的邮箱吗？”

                    - 发送报告：
                      “好的，我会将【{企业名称}】的详细信息报告发送到【{邮箱地址}】。处理完成后，您将收到通知邮件，请注意查收。”

                    - 信息不足：
                      “为了更准确地查询，请提供企业的完整名称或统一社会信用代码，这将帮助我获取最准确的信息。”

                    - 查询失败或异常：
                      “很抱歉，暂时无法获取该企业的信息。请确认输入是否正确，或稍后再试。”

                    ## 交互规则

                    - 始终以礼貌、专业的语气回应用户。
                    - 不得存储、展示或泄露用户的任何敏感信息，所有操作仅限于当前会话。
                    - 保护用户隐私和数据安全。

                    ## 未来能力（可告知用户正在开发中）

                    - 企业财务状况分析
                    - 企业风险评估
                    - 企业竞争分析报告生成
                    - 企业动态变化监控
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
