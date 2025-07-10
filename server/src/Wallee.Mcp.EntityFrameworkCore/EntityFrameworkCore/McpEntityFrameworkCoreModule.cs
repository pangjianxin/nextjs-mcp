using Wallee.Mcp.CorporateInfos;
using Microsoft.Extensions.DependencyInjection;
using System;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.Studio;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Wallee.Mcp.CorporateReports;

namespace Wallee.Mcp.EntityFrameworkCore;

[DependsOn(
    typeof(McpDomainModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpEntityFrameworkCorePostgreSqlModule),
    typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule)
    )]
public class McpEntityFrameworkCoreModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        // https://www.npgsql.org/efcore/release-notes/6.0.html#opting-out-of-the-new-timestamp-mapping-logic
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        McpEfCoreEntityExtensionMappings.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<McpDbContext>(options =>
        {
            options.AddRepository<CorporateInfo, CorporateInfoRepository>();
            options.AddRepository<CorporateReport, CorporateReportRepository>();
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        //if (AbpStudioAnalyzeHelper.IsInAnalyzeMode)
        //{
        //    return;
        //}

        Configure<AbpDbContextOptions>(options =>
        {
            /* The main point to change your DBMS.
             * See also McpDbContextFactory for EF Core tooling. */

            options.UseNpgsql();

        });

    }
}
