namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class CreateCorporateReportDto
    {
        public CorporateReportType Type { get; set; } = default!;
        public string CompanyName { get; set; } = default!;
        public string CompanyUniscId { get; set; } = default!;
        public string Email { get; set; } = default!;
    }
}
