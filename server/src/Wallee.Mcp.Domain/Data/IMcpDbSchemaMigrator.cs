using System.Threading.Tasks;

namespace Wallee.Mcp.Data;

public interface IMcpDbSchemaMigrator
{
    Task MigrateAsync();
}
