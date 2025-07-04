using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.MongoDB;
using Volo.Abp.Uow;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.Mongo.CorporateInfos;

namespace Wallee.Mcp.Mongo.MongoDb
{
    [DependsOn(
        typeof(McpDomainModule),
        typeof(AbpMongoDbModule)
        )]
    public class OpenMongoDbModule : AbpModule
    {

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddMongoDbContext<OpenaiMongoDbContext>(options =>
            {
                options.AddDefaultRepositories();
                options.AddRepository<CorporateInfo, MongoDbCorporateInfoRepository>();
            });

            Configure<AbpUnitOfWorkDefaultOptions>(options =>
            {
                options.TransactionBehavior = UnitOfWorkTransactionBehavior.Disabled;
            });
        }
    }
}
