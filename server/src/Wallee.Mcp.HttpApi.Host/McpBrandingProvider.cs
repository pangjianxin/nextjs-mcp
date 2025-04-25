using Microsoft.Extensions.Localization;
using Wallee.Mcp.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Wallee.Mcp;

[Dependency(ReplaceServices = true)]
public class McpBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<McpResource> _localizer;

    public McpBrandingProvider(IStringLocalizer<McpResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
