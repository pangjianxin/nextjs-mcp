using System;
using System.Linq;
using System.Threading.Tasks;
using Wallee.Mcp.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Wallee.Mcp.CorporateInfos;

public class CorporateInfoRepository : EfCoreRepository<McpDbContext, CorporateInfo, Guid>, ICorporateInfoRepository
{
    public CorporateInfoRepository(IDbContextProvider<McpDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public override async Task<IQueryable<CorporateInfo>> WithDetailsAsync()
    {
        return (await GetQueryableAsync()).IncludeDetails();
    }
}