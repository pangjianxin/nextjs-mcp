using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Wallee.Mcp.CorporateInfos;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Wallee.Mcp.CorporateReports;

namespace Wallee.Mcp.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class McpDbContext :
    AbpDbContext<McpDbContext>,
    ITenantManagementDbContext,
    IIdentityDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */


    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion
    /// <summary>
    /// 企业信息
    /// </summary>
    public DbSet<CorporateInfo> CorporateInfos { get; set; }
    public DbSet<CorporateReport> CorporateReports { get; set; }

    public McpDbContext(DbContextOptions<McpDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        builder.Entity<CorporateInfo>(builder =>
        {
            builder.ToTable(McpConsts.DbTablePrefix + "CorporateInfos", McpConsts.DbSchema, table => table.HasComment("企业信息"));
            builder.ConfigureByConvention();
            builder.HasKey(e => e.Id);
            builder.HasAlternateKey(e => new { e.Name, e.CreditCode });
            builder.Property(e => e.Name).HasMaxLength(255).IsRequired();
            builder.Property(e => e.CreditCode).HasMaxLength(255);
            builder.Property(e => e.RegCapital).HasMaxLength(50);
            builder.Property(e => e.RegCapitalCurrency).HasMaxLength(50);
            builder.Property(e => e.ActualCapital).HasMaxLength(50);
            builder.Property(e => e.ActualCapitalCurrency).HasMaxLength(50);
            builder.Property(e => e.LegalPersonName).HasMaxLength(120);
            builder.Property(e => e.Type);
            builder.Property(e => e.CompanyOrgType).HasMaxLength(127);
            builder.Property(e => e.RegInstitute).HasMaxLength(255);
            builder.Property(e => e.RegNumber).HasMaxLength(31);
            builder.Property(e => e.Base).HasMaxLength(31);
            builder.Property(e => e.RegLocation).HasMaxLength(255);
            builder.Property(e => e.RegStatus).HasMaxLength(31);
            builder.Property(e => e.BusinessScope).HasMaxLength(4091);
            builder.Property(e => e.Industry).HasMaxLength(255);
            builder.Property(e => e.PercentileScore);
            builder.Property(e => e.ApprovedTime);
            builder.Property(e => e.EstiblishTime);
            builder.Property(e => e.FromTime);
            builder.Property(e => e.ToTime);
            builder.Property(e => e.UpdateTimes);
            builder.Property(e => e.CancelDate);
            builder.Property(e => e.CancelReason).HasMaxLength(500);
            builder.Property(e => e.RevokeDate);
            builder.Property(e => e.RevokeReason).HasMaxLength(500);
            builder.Property(e => e.IsMicroEnt);
            builder.Property(e => e.SocialStaffNum);
            builder.Property(e => e.StaffNumRange).HasMaxLength(50);
            builder.Property(e => e.Tags).HasMaxLength(255);
            builder.Property(e => e.TaxNumber).HasMaxLength(255);
            builder.Property(e => e.OrgNumber).HasMaxLength(31);
            builder.Property(e => e.Alias).HasMaxLength(255);
            builder.Property(e => e.Property3).HasMaxLength(255);
            builder.Property(e => e.HistoryNames).HasMaxLength(255);
            builder.Property(e => e.PhoneNumber).HasMaxLength(255);
            builder.Property(e => e.WebsiteList).HasColumnType("text");
            builder.Property(e => e.City).HasMaxLength(20);
            builder.Property(e => e.District).HasMaxLength(20);
            builder.Property(e => e.DistrictCode).HasMaxLength(20);
            builder.Property(e => e.BondNum).HasMaxLength(20);
            builder.Property(e => e.BondName).HasMaxLength(20);
            builder.Property(e => e.BondType).HasMaxLength(31);
            builder.Property(e => e.UsedBondName).HasMaxLength(100);
            builder.Property(e => e.BRNNumber).HasMaxLength(50);
            builder.Property(e => e.EconomicFunctionZone1).HasMaxLength(20);
            builder.Property(e => e.EconomicFunctionZone2).HasMaxLength(20);
            builder.Property(e => e.HistoryNameList).HasColumnType("text[]");
            builder.Property(e => e.EmailList).HasColumnType("text[]");
            builder.OwnsOne(it => it.IndustryAll, config =>
            {
                config.Property(e => e.CategoryCodeFourth).HasMaxLength(255);
                config.Property(e => e.CategoryCodeThird).HasMaxLength(255);
                config.Property(e => e.CategoryCodeSecond).HasMaxLength(255);
                config.Property(e => e.CategoryCodeFirst).HasMaxLength(255);
                config.Property(e => e.Category).HasMaxLength(255);
                config.Property(e => e.CategoryBig).HasMaxLength(255);
                config.Property(e => e.CategoryMiddle).HasMaxLength(255);
                config.Property(e => e.CategorySmall).HasMaxLength(255);
                config.ToJson();
            });
        });

        builder.Entity<CorporateReport>(builder =>
        {
            builder.ToTable(McpConsts.DbTablePrefix + "CorporateReports", McpConsts.DbSchema, table => table.HasComment("企业报告信息"));
            builder.ConfigureByConvention();
            builder.HasKey(e => e.Id);
            builder.HasIndex(e => new { e.CompanyName, e.CompanyUniscId });
            //builder.HasAlternateKey(e => new { e.CompanyName, e.CompanyUniscId });
            builder.Property(it => it.CompanyName).HasMaxLength(128).IsRequired();
            builder.Property(it => it.CompanyUniscId).HasMaxLength(32).IsRequired();
            builder.Property(it => it.DocumentName).HasMaxLength(256);
            builder.OwnsMany(it => it.TransmissionHistories, config =>
            {
                config.Property(it => it.Email).IsRequired();
                config.ToJson();
            });
        });
    }
}
