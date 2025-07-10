using System.Linq;

namespace Wallee.Mcp.CorporateReports;

/// <summary>
/// 企业信息
/// </summary>
public static class CorporateReportEfCoreQueryableExtensions
{
    public static IQueryable<CorporateReport> IncludeDetails(this IQueryable<CorporateReport> queryable, bool include = true)
    {
        if (!include)
        {
            return queryable;
        }

        return queryable
            // .Include(x => x.xxx) // TODO: AbpHelper generated
            ;
    }
}
