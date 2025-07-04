using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Wallee.Mcp.CorporateReports
{
    public class CorporateReport : AuditedAggregateRoot<Guid>
    {
        protected CorporateReport()
        {

        }
        public CorporateReport(Guid id, CorporateReportType type, string companyUniscId, string companyName, string documentName) : base(id)
        {
            DownloadCount = 0;
            DocumentGenerated = false;
            Type = type;
            CompanyUniscId = companyUniscId;
            CompanyName = companyName;
            DocumentName = documentName;
            TransmissionHistories = [];
        }
        /// <summary>
        /// blob id
        /// </summary>
        public Guid? BlobId { get; private set; }
        public string? DocumentName { get; private set; }
        public int DownloadCount { get; private set; }
        public string? MediaType { get; private set; }
        public long ContentLength { get; private set; } = default!;
        public bool DocumentGenerated { get; private set; }
        public CorporateReportType Type { get; private set; }
        public string CompanyUniscId { get; private set; } = default!;
        public string CompanyName { get; private set; } = default!;
        public List<TransmissionHistory>? TransmissionHistories { get; private set; }

        public void UpdateBlobInfo(Guid blobId, string mediaType, long contentLength, bool docGenerated = true)
        {
            BlobId = blobId;
            MediaType = mediaType;
            ContentLength = contentLength;
            DocumentGenerated = docGenerated;
        }

        public void UpdateDownloadHistory(TransmissionHistory history)
        {
            ++DownloadCount;
            TransmissionHistories ??= [];
            TransmissionHistories.Add(history);
        }
    }
}
