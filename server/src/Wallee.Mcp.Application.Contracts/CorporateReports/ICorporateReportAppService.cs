using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using Wallee.Mcp.CorporateReports.Dtos;

namespace Wallee.Mcp.CorporateReports
{
    public interface ICorporateReportAppService : IReadOnlyAppService<CorporateReportDto, Guid, CorporateReportGetListInput>
    {
        Task<CorporateReportDto> CreateAsync(CreateCorporateReportDto input);
        Task<IRemoteStreamContent> GetDownloadAsync(Guid id);
    }
}
