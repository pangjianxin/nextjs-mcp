using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Wallee.Mcp.EntityFrameworkCore;

namespace Wallee.Mcp.CorporateReports
{
    public class CorporateReportRepository : EfCoreRepository<McpDbContext, CorporateReport, Guid>, ICorporateReportRepository
    {
        public CorporateReportRepository(IDbContextProvider<McpDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override async Task<IQueryable<CorporateReport>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }
    }
}
