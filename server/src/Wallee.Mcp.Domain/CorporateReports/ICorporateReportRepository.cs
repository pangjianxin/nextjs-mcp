using System;
using Volo.Abp.Domain.Repositories;

namespace Wallee.Mcp.CorporateReports
{
    public interface ICorporateReportRepository : IRepository<CorporateReport, Guid>
    {
    }
}
