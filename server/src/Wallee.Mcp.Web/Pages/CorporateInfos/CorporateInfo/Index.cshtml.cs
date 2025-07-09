using System;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.AspNetCore.Mvc.UI.Bootstrap.TagHelpers.Form;

namespace Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo;

public class IndexModel : McpPageModel
{
    public CorporateInfoFilterInput CorporateInfoFilter { get; set; }
    
    public virtual async Task OnGetAsync()
    {
        await Task.CompletedTask;
    }
}

public class CorporateInfoFilterInput
{
    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoExternalId")]
    public int? ExternalId { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoName")]
    public string? Name { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoCreditCode")]
    public string? CreditCode { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegCapital")]
    public string? RegCapital { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegCapitalCurrency")]
    public string? RegCapitalCurrency { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoActualCapital")]
    public string? ActualCapital { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoActualCapitalCurrency")]
    public string? ActualCapitalCurrency { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoLegalPersonName")]
    public string? LegalPersonName { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoType")]
    public int? Type { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoCompanyOrgType")]
    public string? CompanyOrgType { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegInstitute")]
    public string? RegInstitute { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegNumber")]
    public string? RegNumber { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBase")]
    public string? Base { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegLocation")]
    public string? RegLocation { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRegStatus")]
    public string? RegStatus { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBusinessScope")]
    public string? BusinessScope { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoIndustry")]
    public string? Industry { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoIndustryAll")]
    public IndustryAllInfo? IndustryAll { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoPercentileScore")]
    public int? PercentileScore { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoApprovedTime")]
    public DateTime? ApprovedTime { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoEstiblishTime")]
    public DateTime? EstiblishTime { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoFromTime")]
    public DateTime? FromTime { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoToTime")]
    public DateTime? ToTime { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoUpdateTimes")]
    public DateTime? UpdateTimes { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoCancelDate")]
    public DateTime? CancelDate { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoCancelReason")]
    public string? CancelReason { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRevokeDate")]
    public DateTime? RevokeDate { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoRevokeReason")]
    public string? RevokeReason { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoIsMicroEnt")]
    public int? IsMicroEnt { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoSocialStaffNum")]
    public int? SocialStaffNum { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoStaffNumRange")]
    public string? StaffNumRange { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoTags")]
    public string? Tags { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoTaxNumber")]
    public string? TaxNumber { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoOrgNumber")]
    public string? OrgNumber { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoAlias")]
    public string? Alias { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoProperty3")]
    public string? Property3 { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoHistoryNames")]
    public string? HistoryNames { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoPhoneNumber")]
    public string? PhoneNumber { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoWebsiteList")]
    public string? WebsiteList { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoCity")]
    public string? City { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoDistrict")]
    public string? District { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoDistrictCode")]
    public string? DistrictCode { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBondNum")]
    public string? BondNum { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBondName")]
    public string? BondName { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBondType")]
    public string? BondType { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoUsedBondName")]
    public string? UsedBondName { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoBRNNumber")]
    public string? BRNNumber { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoEconomicFunctionZone1")]
    public string? EconomicFunctionZone1 { get; set; }

    [FormControlSize(AbpFormControlSize.Small)]
    [Display(Name = "CorporateInfoEconomicFunctionZone2")]
    public string? EconomicFunctionZone2 { get; set; }
}
