using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Wallee.Mcp.CorporateInfos;

/// <summary>
/// 工商信息
/// </summary>
public interface ICorporateInfoRepository : IRepository<CorporateInfo, Guid>
{
    Task<int> CountAsync(string filter);
    Task<List<CorporateInfo>> GetListAsync(string? filter, int skipCount = 0, int maxResult = int.MaxValue);
    Task<CorporateInfo> UpsertAsync(CorporateInfo corporateInfo);
}
