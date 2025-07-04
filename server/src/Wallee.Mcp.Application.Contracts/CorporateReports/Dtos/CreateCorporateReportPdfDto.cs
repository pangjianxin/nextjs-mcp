using System;

namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class CreateCorporateReportPdfDto
    {
        public Guid CorporateReportId { get; set; }
        public string Email { get; set; } = default!;
        public Guid UserId { get; set; }
    }
}
