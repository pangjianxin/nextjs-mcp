using Volo.Abp.BackgroundJobs;
using Wallee.Mcp.CorporateReports.BackgroundJobs;

namespace Wallee.Mcp.CorporateInfos.BackgroundJobs
{
    [BackgroundJobName("获取天眼查企业基础信息")]
    public class FetchCorporateInfoJobArgs
    {
        public string CreditCode { get; set; } = default!;
        public GenerateCorporateReportJobArgs? GenerateCorporateReportJobArgs { get; set; }
    }
}
