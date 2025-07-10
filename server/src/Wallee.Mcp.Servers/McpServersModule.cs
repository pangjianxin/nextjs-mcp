using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace Wallee.Mcp
{
    [DependsOn(typeof(McpDomainModule), typeof(McpApplicationContractsModule))]
    public class McpServersModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();
        }
    }
}
