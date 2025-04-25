using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Wallee.Mcp.Data;
using Volo.Abp.DependencyInjection;

namespace Wallee.Mcp.EntityFrameworkCore;

public class EntityFrameworkCoreMcpDbSchemaMigrator
    : IMcpDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreMcpDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the McpDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<McpDbContext>()
            .Database
            .MigrateAsync();
    }
}
