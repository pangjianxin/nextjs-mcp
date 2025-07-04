using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.CorporateInfos.Records;

namespace Wallee.Mcp.Utils
{
    public interface ITianYanChaCorporateInfoFetcher : ITransientDependency
    {
        Task<CorporateInfoDto> FetchAdministrativeLicensesAsync(string creditCode);
        Task<CorporateInfoDto> FetchBranchesAsync(string creditCode);
        Task<CorporateInfoDto> FetchChangeInfosAsync(string creditCode);
        Task<CorporateInfoDto> FetchCorporateInfoAsync(string creditCode);
        Task<CorporateInfoDto> FetchInvestmentsAsync(string creditCode);
        Task<CorporateInfoDto> FetchShareholdersAsync(string creditCode);
        Task<CorporateInfoDto> FetchStaffsAsync(string creditCode);
        Task<TianYanChaPagedResult<CorporateSearchInfoRec>?> SearchCorporateInfoAsync(string search, int pageSize = 5);
    }
}
