using AutoFilterer.Extensions;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.Utils;

namespace Wallee.Mcp.CorporateInfos;


/// <summary>
/// 企业信息
/// </summary>
public class CorporateInfoAppService : CrudAppService<CorporateInfo, CorporateInfoDto, Guid, CorporateInfoGetListInput>,
    ICorporateInfoAppService
{

    private readonly ICorporateInfoRepository _repository;
    private readonly ITianYanChaCorporateInfoFetcher _tianYanChaCorporateInfoFetcher;

    public CorporateInfoAppService(
        ICorporateInfoRepository repository,
        ITianYanChaCorporateInfoFetcher tianYanChaCorporateInfoFetcher) : base(repository)
    {
        _repository = repository;
        _tianYanChaCorporateInfoFetcher = tianYanChaCorporateInfoFetcher;
    }

    protected override async Task<IQueryable<CorporateInfo>> CreateFilteredQueryAsync(CorporateInfoGetListInput input)
    {
        // TODO: AbpHelper generated
        return (await base.CreateFilteredQueryAsync(input)).ApplyFilter(input);
    }
}
