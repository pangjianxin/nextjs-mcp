using Wallee.Mcp.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Wallee.Mcp.Permissions;

public class McpPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(McpPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(McpPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<McpResource>(name);
    }
}
