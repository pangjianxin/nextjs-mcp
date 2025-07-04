using AutoFilterer.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.Utils;

namespace Wallee.Mcp.CorporateInfos;


/// <summary>
/// 工商信息
/// </summary>
public class CorporateInfoAppService : ReadOnlyAppService<CorporateInfo, CorporateInfoDto, Guid, CorporateInfoGetListInput>, ICorporateInfoAppService
{
    private readonly ICorporateInfoRepository _corporateInfoRepository;
    private readonly ITianYanChaCorporateInfoFetcher _tianYanChaCorporateInfoFetcher;

    public CorporateInfoAppService(
        ICorporateInfoRepository corporateInfoRepository,
        ITianYanChaCorporateInfoFetcher tianYanChaCorporateInfoFetcher) : base(corporateInfoRepository)
    {
        _corporateInfoRepository = corporateInfoRepository;
        _tianYanChaCorporateInfoFetcher = tianYanChaCorporateInfoFetcher;
    }
    public async Task<PagedResultDto<CorporateInfoListDto>> ProjectAsync(CorporateInfoGetListInput input)
    {
        var count = await _corporateInfoRepository.CountAsync(input.Filter!);
        var list = await _corporateInfoRepository.GetListAsync(input.Filter, input.SkipCount, input.MaxResultCount);
        return new PagedResultDto<CorporateInfoListDto>
        {
            Items = ObjectMapper.Map<List<CorporateInfo>, List<CorporateInfoListDto>>(list),
            TotalCount = count
        };
    }
    public async Task<CorporateInfoDto> FindByCreditCode(string creditCode)
    {
        var entity = await _corporateInfoRepository.GetAsync(it => it.CreditCode == creditCode);

        return await MapToGetOutputDtoAsync(entity);
    }

    public async Task<CorporateInfoDto> GetOrAddCorporateInfoAsync(GetOrAddCorporateInfoDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchCorporateInfoAsync(input.CreditCode);
    }
    /// <summary>
    /// 可以通过公司名称或ID获取企业主要人员信息，主要人员信息包括董事、监事、高级管理人员姓名、职位、主要人员总数等字段的详细信息
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    /// <exception cref="UserFriendlyException"></exception>
    public async Task<CorporateInfoDto> UpdateStaffsAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchStaffsAsync(input.CreditCode);
    }

    public async Task<CorporateInfoDto> UpdateShareholdersAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchShareholdersAsync(input.CreditCode);
    }

    protected override async Task<IQueryable<CorporateInfo>> CreateFilteredQueryAsync(CorporateInfoGetListInput input)
    {
        return (await base.CreateFilteredQueryAsync(input)).ApplyFilter(input);
    }

    public async Task<CorporateInfoDto> UpdateBranchesAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchBranchesAsync(input.CreditCode);
    }

    public async Task<CorporateInfoDto> UpdateInvestmentsAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchInvestmentsAsync(input.CreditCode);
    }
    /// <summary>
    /// 可以通过公司名称或ID获取企业变更记录，变更记录包括工商变更事项、变更前后信息等字段的详细信息
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<CorporateInfoDto> UpdateChangeInfosAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchChangeInfosAsync(input.CreditCode);
    }
    /// <summary>
    /// 可以通过公司名称或ID获取企业行政许可信息，企业行政许可信息包括许可文件名称、决定许可机关、许可内容、决定日期/有效期自、截止日期/有效期至、数据来源等
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<CorporateInfoDto> UpdateAdministrativeLicensesAsync(UpdateItemsDto input)
    {
        return await _tianYanChaCorporateInfoFetcher.FetchAdministrativeLicensesAsync(input.CreditCode);
    }
}
