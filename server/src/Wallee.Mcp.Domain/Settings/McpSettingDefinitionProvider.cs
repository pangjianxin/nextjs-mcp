using Volo.Abp.Settings;

namespace Wallee.Mcp.Settings;

public class McpSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(McpSettings.MySetting1));
    }
}
