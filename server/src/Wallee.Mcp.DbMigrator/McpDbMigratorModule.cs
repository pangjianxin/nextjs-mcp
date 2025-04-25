using Wallee.Mcp.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Wallee.Mcp.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(McpEntityFrameworkCoreModule),
    typeof(McpApplicationContractsModule)
)]
public class McpDbMigratorModule : AbpModule
{
}
