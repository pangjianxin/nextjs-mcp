using MongoDB.Driver;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.MongoDB;
using Wallee.Mcp.CorporateInfos;

namespace Wallee.Mcp.Mongo.MongoDb;

[ConnectionStringName("Mongo")]
public class OpenaiMongoDbContext : AbpMongoDbContext
{
    /* Add mongo collections here. Example:
     * public IMongoCollection<Question> Questions => Collection<Question>();
     */

    public IMongoCollection<CorporateInfo> CorporateInfos => Collection<CorporateInfo>();

    protected override void CreateModel(IMongoModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));

        base.CreateModel(builder);

        builder.Entity<CorporateInfo>(b =>
        {
            b.CollectionName = McpConsts.DbTablePrefix + "CorporateInfos";
        });
    }


}
