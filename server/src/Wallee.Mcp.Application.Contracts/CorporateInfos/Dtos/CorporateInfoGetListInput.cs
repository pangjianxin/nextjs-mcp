using AutoFilterer.Attributes;
using AutoFilterer.Types;
using System;
using Volo.Abp.Application.Dtos;

namespace Wallee.Mcp.CorporateInfos.Dtos;

[Serializable]
public class CorporateInfoGetListInput : FilterBase, IPagedAndSortedResultRequest
{
    [CompareTo(
        nameof(CorporateInfoDto.Name),
        nameof(CorporateInfoDto.CreditCode))]
    [StringFilterOptions(AutoFilterer.Enums.StringFilterOption.Contains)]
    public string? Filter { get; set; }
    public int SkipCount { get; set; }
    public int MaxResultCount { get; set; }
    public string? Sorting { get; set; }
}
