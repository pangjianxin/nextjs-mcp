using System;
using Wallee.Mcp.CorporateInfos.Dtos;
using Volo.Abp.Application.Services;

namespace Wallee.Mcp.CorporateInfos;


/// <summary>
/// 企业信息
/// </summary>
public interface ICorporateInfoAppService :
    IReadOnlyAppService<
        CorporateInfoDto,
        Guid,
        CorporateInfoGetListInput>
{

}