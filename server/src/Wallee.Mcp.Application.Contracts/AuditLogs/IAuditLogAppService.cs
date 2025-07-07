using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wallee.Mcp.AuditLogs.Dtos;

namespace Wallee.Mcp.AuditLogs
{
    public interface IAuditLogAppService : IApplicationService
    {
        Task<PagedResultDto<AuditLogDto>> GetListAsync(GetAuditLogsInput input);
        Task<AuditLogDto> GetAsync(Guid id);
    }
}
