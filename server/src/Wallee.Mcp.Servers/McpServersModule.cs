using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using Volo.Abp.Modularity;

namespace Wallee.Mcp
{
    [DependsOn(typeof(McpDomainModule), typeof(McpApplicationContractsModule))]
    public class McpServersModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();

            context.Services.AddHttpClient("TianYanCha", (serviceProvider, client) =>
            {
                client.DefaultRequestHeaders.Add("Authorization", configuration[$"{OpenRemoteServiceConsts.TianYanCha}:Token"]);
                client.BaseAddress = new Uri(configuration[$"{OpenRemoteServiceConsts.TianYanCha}:BaseUrl"]!);
            });
        }
    }
}
