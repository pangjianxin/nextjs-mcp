using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Wallee.Mcp.Data;

/* This is used if database provider does't define
 * IMcpDbSchemaMigrator implementation.
 */
public class NullMcpDbSchemaMigrator : IMcpDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
