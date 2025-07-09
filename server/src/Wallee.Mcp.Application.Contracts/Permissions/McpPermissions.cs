namespace Wallee.Mcp.Permissions;

public static class McpPermissions
{
    public const string GroupName = "Mcp";


    
    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
    /// <summary>
    /// 企业信息
    /// </summary>
    public class CorporateInfo
    {
        public const string Default = GroupName + ".CorporateInfo";
        public const string Update = Default + ".Update";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }
}
