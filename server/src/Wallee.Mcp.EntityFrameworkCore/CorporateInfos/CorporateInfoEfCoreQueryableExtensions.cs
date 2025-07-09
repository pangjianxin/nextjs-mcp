using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Wallee.Mcp.CorporateInfos;

/// <summary>
/// 企业信息
/// </summary>
public static class CorporateInfoEfCoreQueryableExtensions
{
    public static IQueryable<CorporateInfo> IncludeDetails(this IQueryable<CorporateInfo> queryable, bool include = true)
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
