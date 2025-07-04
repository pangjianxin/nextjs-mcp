using System;
using Volo.Abp.BackgroundJobs;

namespace Wallee.Mcp.CorporateReports.BackgroundJobs
{
    [BackgroundJobName("生成企业档案")]
    public class GenerateCorporateReportJobArgs
    {
        public string Email { get; set; } = default!;
        public Guid? UserId { get; set; }
        public string CompanyUniscId { get; set; } = default!;
        public CorporateReportType CorporateReportType { get; set; }
    }
}
