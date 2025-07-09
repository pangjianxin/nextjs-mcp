using System;
using System.ComponentModel.DataAnnotations;

namespace Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo.ViewModels;

public class CreateEditCorporateInfoViewModel
{
    [Display(Name = "CorporateInfoExternalId")]
    public int ExternalId { get; set; }

    [Display(Name = "CorporateInfoName")]
    public string Name { get; set; }

    [Display(Name = "CorporateInfoCreditCode")]
    public string CreditCode { get; set; }

    [Display(Name = "CorporateInfoRegCapital")]
    public string? RegCapital { get; set; }

    [Display(Name = "CorporateInfoRegCapitalCurrency")]
    public string? RegCapitalCurrency { get; set; }

    [Display(Name = "CorporateInfoActualCapital")]
    public string? ActualCapital { get; set; }

    [Display(Name = "CorporateInfoActualCapitalCurrency")]
    public string? ActualCapitalCurrency { get; set; }

    [Display(Name = "CorporateInfoLegalPersonName")]
    public string? LegalPersonName { get; set; }

    [Display(Name = "CorporateInfoType")]
    public int Type { get; set; }

    [Display(Name = "CorporateInfoCompanyOrgType")]
    public string? CompanyOrgType { get; set; }

    [Display(Name = "CorporateInfoRegInstitute")]
    public string? RegInstitute { get; set; }

    [Display(Name = "CorporateInfoRegNumber")]
    public string? RegNumber { get; set; }

    [Display(Name = "CorporateInfoBase")]
    public string? Base { get; set; }

    [Display(Name = "CorporateInfoRegLocation")]
    public string? RegLocation { get; set; }

    [Display(Name = "CorporateInfoRegStatus")]
    public string? RegStatus { get; set; }

    [Display(Name = "CorporateInfoBusinessScope")]
    public string? BusinessScope { get; set; }

    [Display(Name = "CorporateInfoIndustry")]
    public string? Industry { get; set; }

    [Display(Name = "CorporateInfoIndustryAll")]
    public IndustryAllInfo? IndustryAll { get; set; }

    [Display(Name = "CorporateInfoPercentileScore")]
    public int PercentileScore { get; set; }

    [Display(Name = "CorporateInfoApprovedTime")]
    public DateTime? ApprovedTime { get; set; }

    [Display(Name = "CorporateInfoEstiblishTime")]
    public DateTime? EstiblishTime { get; set; }

    [Display(Name = "CorporateInfoFromTime")]
    public DateTime? FromTime { get; set; }

    [Display(Name = "CorporateInfoToTime")]
    public DateTime? ToTime { get; set; }

    [Display(Name = "CorporateInfoUpdateTimes")]
    public DateTime? UpdateTimes { get; set; }

    [Display(Name = "CorporateInfoCancelDate")]
    public DateTime? CancelDate { get; set; }

    [Display(Name = "CorporateInfoCancelReason")]
    public string? CancelReason { get; set; }

    [Display(Name = "CorporateInfoRevokeDate")]
    public DateTime? RevokeDate { get; set; }

    [Display(Name = "CorporateInfoRevokeReason")]
    public string? RevokeReason { get; set; }

    [Display(Name = "CorporateInfoIsMicroEnt")]
    public int IsMicroEnt { get; set; }

    [Display(Name = "CorporateInfoSocialStaffNum")]
    public int? SocialStaffNum { get; set; }

    [Display(Name = "CorporateInfoStaffNumRange")]
    public string? StaffNumRange { get; set; }

    [Display(Name = "CorporateInfoTags")]
    public string? Tags { get; set; }

    [Display(Name = "CorporateInfoTaxNumber")]
    public string? TaxNumber { get; set; }

    [Display(Name = "CorporateInfoOrgNumber")]
    public string? OrgNumber { get; set; }

    [Display(Name = "CorporateInfoAlias")]
    public string? Alias { get; set; }

    [Display(Name = "CorporateInfoProperty3")]
    public string? Property3 { get; set; }

    [Display(Name = "CorporateInfoHistoryNames")]
    public string? HistoryNames { get; set; }

    [Display(Name = "CorporateInfoHistoryNameList")]
    public List<string>? HistoryNameList { get; set; }

    [Display(Name = "CorporateInfoEmailList")]
    public List<string>? EmailList { get; set; }

    [Display(Name = "CorporateInfoPhoneNumber")]
    public string? PhoneNumber { get; set; }

    [Display(Name = "CorporateInfoWebsiteList")]
    public string? WebsiteList { get; set; }

    [Display(Name = "CorporateInfoCity")]
    public string? City { get; set; }

    [Display(Name = "CorporateInfoDistrict")]
    public string? District { get; set; }

    [Display(Name = "CorporateInfoDistrictCode")]
    public string? DistrictCode { get; set; }

    [Display(Name = "CorporateInfoBondNum")]
    public string? BondNum { get; set; }

    [Display(Name = "CorporateInfoBondName")]
    public string? BondName { get; set; }

    [Display(Name = "CorporateInfoBondType")]
    public string? BondType { get; set; }

    [Display(Name = "CorporateInfoUsedBondName")]
    public string? UsedBondName { get; set; }

    [Display(Name = "CorporateInfoBRNNumber")]
    public string? BRNNumber { get; set; }

    [Display(Name = "CorporateInfoEconomicFunctionZone1")]
    public string? EconomicFunctionZone1 { get; set; }

    [Display(Name = "CorporateInfoEconomicFunctionZone2")]
    public string? EconomicFunctionZone2 { get; set; }
}
