using System;

namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class EmailCorporateReportPdfDto
    {
        public Guid CorporateReportId { get; set; }
        public string EmailTo { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public string Body { get; set; } = default!;
        public Guid UserId { get; set; }
    }
}
