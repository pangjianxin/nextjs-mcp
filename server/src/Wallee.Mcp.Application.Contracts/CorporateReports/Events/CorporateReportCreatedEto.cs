using System;
using Volo.Abp.EventBus;

namespace Wallee.Mcp.CorporateReports.Events
{
    [EventName("Openai.CorporateReport.Created")]
    public class CorporateReportCreatedEto
    {
        public Guid CorporateReportId { get; set; }
    }
}
