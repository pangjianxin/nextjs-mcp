using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Wallee.Mcp.AuditLogs;
using Wallee.Mcp.AuditLogs.Dtos;

namespace Wallee.Mcp.Controllers.AuditLogs
{
    [Route("api/admin/audit-log")]
    [Authorize]
    public class AuditLogController : McpController, IAuditLogAppService
    {
        private readonly IAuditLogAppService _service;

        public AuditLogController(IAuditLogAppService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<AuditLogDto> GetAsync(Guid id)
        {
            return await _service.GetAsync(id);
        }

        [HttpGet]
        [Route("")]
        public async Task<PagedResultDto<AuditLogDto>> GetListAsync(GetAuditLogsInput input)
        {
            return await _service.GetListAsync(input);
        }
    }
}
