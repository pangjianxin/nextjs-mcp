using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.DependencyInjection;
using Wallee.Mcp.CorporateInfos.Dtos;

namespace Wallee.Mcp.CorporateInfos;


/// <summary>
/// 工商信息
/// </summary>
public interface ICorporateInfoAppService :
    IReadOnlyAppService<
        CorporateInfoDto,
        Guid,
        CorporateInfoGetListInput>,
    ITransientDependency
{
    //Task UpsertByTianYanChaFileAsync(EtlFileDto input);
    //Task DeleteAsync(Guid id);

    Task<CorporateInfoDto> GetOrAddCorporateInfoAsync(GetOrAddCorporateInfoDto input);
    Task<CorporateInfoDto> UpdateShareholdersAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> UpdateStaffsAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> UpdateBranchesAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> UpdateInvestmentsAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> UpdateChangeInfosAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> UpdateAdministrativeLicensesAsync(UpdateItemsDto input);
    Task<CorporateInfoDto> FindByCreditCode(string creditCode);
    Task<PagedResultDto<CorporateInfoListDto>> ProjectAsync(CorporateInfoGetListInput input);
}
