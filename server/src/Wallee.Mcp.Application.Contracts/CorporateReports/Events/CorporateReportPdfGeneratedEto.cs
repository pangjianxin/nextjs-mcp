using System;
using Volo.Abp.EventBus;

namespace Wallee.Mcp.CorporateReports.Events
{
    [EventName("Openai.CorporateReport.Pdf.Created")]
    public class CorporateReportPdfGeneratedEto
    {
        public Guid CorporateReportId { get; set; }
        public string EmailTo { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public string Body { get; set; } = default!;
        public Guid UserId { get; set; }
    }
}
