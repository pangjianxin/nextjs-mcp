using System;
using Volo.Abp.Domain.Repositories;

namespace Wallee.Mcp.CorporateInfos;

/// <summary>
/// 企业信息
/// </summary>
public interface ICorporateInfoRepository : IRepository<CorporateInfo, Guid>
{
}
