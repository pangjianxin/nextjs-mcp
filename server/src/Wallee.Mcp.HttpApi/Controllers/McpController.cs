using Wallee.Mcp.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Wallee.Mcp.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class McpController : AbpControllerBase
{
    protected McpController()
    {
        LocalizationResource = typeof(McpResource);
    }
}
