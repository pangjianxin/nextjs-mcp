using System;

namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class TransmissionHistoryDto
    {
        public Guid? UserId { get; set; }
        public string Email { get; set; } = default!;
        public string? Date { get; set; }
    }
}
