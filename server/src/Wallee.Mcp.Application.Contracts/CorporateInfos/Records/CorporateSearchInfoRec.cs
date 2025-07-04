namespace Wallee.Mcp.CorporateInfos.Records
{
    public record CorporateSearchInfoRec
    {
        public string RegStatus { get; set; } = default!;
        public string EstiblishTime { get; set; } = default!;
        public string RegCapital { get; set; } = default!;
        public int CompanyType { get; set; }
        public string MatchType { get; set; } = default!;
        public int Type { get; set; }
        public string LegalPersonName { get; set; } = default!;
        public string RegNumber { get; set; } = default!;
        public string CreditCode { get; set; } = default!;
        public string Name { get; set; } = default!;
        public long Id { get; set; }
        public string OrgNumber { get; set; } = default!;
        public string Base { get; set; } = default!;
    }
}
