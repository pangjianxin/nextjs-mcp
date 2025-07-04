using System;

namespace Wallee.Mcp.CorporateInfos.Dtos
{
    public class CorporateInfoListDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string CreditCode { get; set; } = default!;
        public string RegCapital { get; set; } = default!;
        public string LegalPersonName { get; set; } = default!;
        public DateTime? EstiblishTime { get; set; }
        public int PercentileScore { get; set; }
        public string? RegLocation { get; set; }
    }
}
