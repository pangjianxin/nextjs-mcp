using System;
using Volo.Abp.BackgroundJobs;

namespace Wallee.Mcp.CorporateReports.BackgroundJobs
{
    [BackgroundJobName("发送企业档案邮件")]
    public class SendCorporateReportJobArgs
    {
        public string EmailTo { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public string Body { get; set; } = default!;
        public Guid CorporateReportId { get; set; }
        public Guid UserId { get; set; }
    }
}
