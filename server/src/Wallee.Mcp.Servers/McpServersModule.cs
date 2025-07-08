using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using Volo.Abp.Modularity;

namespace Wallee.Mcp
{
    [DependsOn(typeof(McpDomainModule))]
    public class McpServersModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddKeyedTransient("QiXin", (sp, _) =>
            {
                var configuration = sp.GetRequiredService<IConfiguration>();
                var apiKey = configuration["QiXin:ApiKey"];
                var apiSecret = configuration["QiXin:ApiSecret"];
                var client = new HttpClient() { BaseAddress = new Uri("https://api.weather.gov") };
                client.DefaultRequestHeaders.Add("", "2d024790-38f8-4a4e-8c76-75f499db4c1e");
                client.DefaultRequestHeaders.Add("", "cf35421a-7963-437c-8cd1-316fa7f9cc3c");
                return client;
            });
        }
    }
}
