using AutoFilterer.Attributes;
using AutoFilterer.Types;
using System;
using Volo.Abp.Application.Dtos;

namespace Wallee.Mcp.CorporateReports.Dtos
{
    public class CorporateReportGetListInput : FilterBase, IPagedAndSortedResultRequest
    {
        [CompareTo(nameof(CorporateReportDto.DocumentName))]
        [StringFilterOptions(AutoFilterer.Enums.StringFilterOption.Contains)]
        public string? Filter { get; set; }

        [CompareTo(nameof(CorporateReportDto.CreatorId))]
        [OperatorComparison(AutoFilterer.Enums.OperatorType.Equal)]
        public Guid? CreatorId { get; set; }

        [CompareTo(nameof(CorporateReportDto.Type))]
        [OperatorComparison(AutoFilterer.Enums.OperatorType.Equal)]
        public CorporateReportType Type { get; set; }

        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
        public string? Sorting { get; set; }
    }
}
