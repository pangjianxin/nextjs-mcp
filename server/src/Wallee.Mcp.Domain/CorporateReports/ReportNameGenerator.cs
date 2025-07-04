using System;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Timing;

namespace Wallee.Mcp.CorporateReports
{
    public class ReportNameGenerator(IClock clock) : ITransientDependency
    {
        private readonly IClock _clock = clock;

        public string GenerateReportName(string companyUniscId, CorporateReportType corporateReportType)
        {
            return corporateReportType switch
            {
                CorporateReportType.企业基础信息 => $"GS{companyUniscId}第{_clock.Now:yyMMdd}号",
                _ => throw new NotImplementedException()
            };
        }
    }
}
