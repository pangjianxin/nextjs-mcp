using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.Account;
using Volo.Abp.Identity;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using Volo.Abp.MailKit;
using Microsoft.Extensions.DependencyInjection;
using QuestPDF.Drawing;
using QuestPDF.Infrastructure;
using System.Reflection;
using Volo.Abp.VirtualFileSystem;
using System;

namespace Wallee.Mcp;

[DependsOn(
    typeof(McpDomainModule),
    typeof(McpApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpAccountApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule),
    typeof(AbpMailKitModule)
    )]
public class McpApplicationModule : AbpModule
{
    public override void PostConfigureServices(ServiceConfigurationContext context)
    {
        QuestPDF.Settings.License = LicenseType.Community;
        QuestPDF.Settings.CheckIfAllTextGlyphsAreAvailable = false;
        Assembly assembly = typeof(McpDomainSharedModule).Assembly;
        using var fileInfo = assembly.GetManifestResourceStream("Wallee.Mcp.fonts.simhei.ttf");
        FontManager.RegisterFontWithCustomName("myFont", fileInfo!);
    }
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();

        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<McpApplicationModule>();
        });

        context.Services.AddHttpClient(OpenRemoteServiceConsts.TianYanCha, (serviceProvider, client) =>
        {
            client.DefaultRequestHeaders.Add("Authorization", configuration[$"{OpenRemoteServiceConsts.TianYanCha}:Token"]);
            client.BaseAddress = new Uri(configuration[$"{OpenRemoteServiceConsts.TianYanCha}:BaseUrl"]!);
        });
    }
}
