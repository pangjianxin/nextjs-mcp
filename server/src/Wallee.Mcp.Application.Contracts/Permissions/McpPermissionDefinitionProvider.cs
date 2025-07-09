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

        var corporateInfoPermission = myGroup.AddPermission(McpPermissions.CorporateInfo.Default, L("Permission:CorporateInfo"));
        corporateInfoPermission.AddChild(McpPermissions.CorporateInfo.Create, L("Permission:Create"));
        corporateInfoPermission.AddChild(McpPermissions.CorporateInfo.Update, L("Permission:Update"));
        corporateInfoPermission.AddChild(McpPermissions.CorporateInfo.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<McpResource>(name);
    }
}
