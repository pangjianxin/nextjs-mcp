using Wallee.Mcp.Localization;
using Volo.Abp.Application.Services;

namespace Wallee.Mcp;

/* Inherit your application services from this class.
 */
public abstract class McpAppService : ApplicationService
{
    protected McpAppService()
    {
        LocalizationResource = typeof(McpResource);
    }
}
