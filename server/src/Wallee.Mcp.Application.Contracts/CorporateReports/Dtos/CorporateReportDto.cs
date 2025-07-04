using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class CorporateReportDto : AuditedEntityDto<Guid>
    {
        public Guid? BlobId { get; private set; }
        public string DocumentName { get; private set; } = default!;
        public int DownloadCount { get; private set; }
        public string MediaType { get; private set; } = default!;
        public long ContentLength { get; private set; } = default!;
        public bool DocumentGenerated { get; private set; }
        public CorporateReportType Type { get; set; }
        public string CompanyUniscId { get; set; } = default!;
        public string CompanyName { get; set; } = default!;
        public List<TransmissionHistoryDto>? TransmissionHistories { get; private set; }
    }
}
