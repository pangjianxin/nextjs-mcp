using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Wallee.Mcp.CorporateInfos;
/// <summary>
/// 企业信息
/// </summary>
public class CorporateInfo : AuditedAggregateRoot<Guid>
{
    /// <summary>企业ID</summary>
    public int ExternalId { get; private set; }

    /// <summary>企业名称</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>统一社会信用代码</summary>
    public string CreditCode { get; private set; } = string.Empty;

    /// <summary>注册资本</summary>
    public string? RegCapital { get; private set; }

    /// <summary>注册资本币种（人民币 美元 欧元 等）</summary>
    public string? RegCapitalCurrency { get; private set; }

    /// <summary>实收注册资本</summary>
    public string? ActualCapital { get; private set; }

    /// <summary>实收注册资本币种（人民币 美元 欧元 等）</summary>
    public string? ActualCapitalCurrency { get; private set; }

    /// <summary>法定代表人</summary>
    public string? LegalPersonName { get; private set; }

    /// <summary>法人类型，1人 2公司</summary>
    public int Type { get; private set; }

    /// <summary>企业类型</summary>
    public string? CompanyOrgType { get; private set; }

    /// <summary>登记机关</summary>
    public string? RegInstitute { get; private set; }

    /// <summary>注册号</summary>
    public string? RegNumber { get; private set; }

    /// <summary>省份简称</summary>
    public string? Base { get; private set; }

    /// <summary>注册地址</summary>
    public string? RegLocation { get; private set; }

    /// <summary>企业状态</summary>
    public string? RegStatus { get; private set; }

    /// <summary>经营范围</summary>
    public string? BusinessScope { get; private set; }

    /// <summary>行业</summary>
    public string? Industry { get; private set; }

    /// <summary>国民经济行业分类</summary>
    public IndustryAllInfo? IndustryAll { get; private set; }

    /// <summary>企业评分（万分制）</summary>
    public int PercentileScore { get; private set; }

    /// <summary>核准时间</summary>
    public DateTime? ApprovedTime { get; private set; }

    /// <summary>成立日期</summary>
    public DateTime? EstiblishTime { get; private set; }

    /// <summary>经营开始时间</summary>
    public DateTime? FromTime { get; private set; }

    /// <summary>经营结束时间</summary>
    public DateTime? ToTime { get; private set; }

    /// <summary>更新时间</summary>
    public DateTime? UpdateTimes { get; private set; }

    /// <summary>注销日期</summary>
    public DateTime? CancelDate { get; private set; }

    /// <summary>注销原因</summary>
    public string? CancelReason { get; private set; }

    /// <summary>吊销日期</summary>
    public DateTime? RevokeDate { get; private set; }

    /// <summary>吊销原因</summary>
    public string? RevokeReason { get; private set; }

    /// <summary>是否为小微企业 0不是 1是</summary>
    public int IsMicroEnt { get; private set; }

    /// <summary>参保人数</summary>
    public int? SocialStaffNum { get; private set; }

    /// <summary>人员规模</summary>
    public string? StaffNumRange { get; private set; }

    /// <summary>企业标签</summary>
    public string? Tags { get; private set; }

    /// <summary>纳税人识别号</summary>
    public string? TaxNumber { get; private set; }

    /// <summary>组织机构代码</summary>
    public string? OrgNumber { get; private set; }

    /// <summary>简称</summary>
    public string? Alias { get; private set; }

    /// <summary>英文名</summary>
    public string? Property3 { get; private set; }

    /// <summary>曾用名</summary>
    public string? HistoryNames { get; private set; }

    /// <summary>曾用名列表</summary>
    public string[]? HistoryNameList { get; private set; }

    /// <summary>企业邮箱列表</summary>
    public string[]? EmailList { get; private set; }

    /// <summary>企业联系方式</summary>
    public string? PhoneNumber { get; private set; }

    /// <summary>企业网址</summary>
    public string? WebsiteList { get; private set; }

    /// <summary>市</summary>
    public string? City { get; private set; }

    /// <summary>区</summary>
    public string? District { get; private set; }

    /// <summary>行政区划代码</summary>
    public string? DistrictCode { get; private set; }

    /// <summary>股票号</summary>
    public string? BondNum { get; private set; }

    /// <summary>股票名</summary>
    public string? BondName { get; private set; }

    /// <summary>股票类型</summary>
    public string? BondType { get; private set; }

    /// <summary>股票曾用名</summary>
    public string? UsedBondName { get; private set; }

    /// <summary>BRN编号（商业登记号）</summary>
    public string? BRNNumber { get; private set; }

    /// <summary>经济行业代码1</summary>
    public string? EconomicFunctionZone1 { get; private set; }

    /// <summary>经济行业代码2</summary>
    public string? EconomicFunctionZone2 { get; private set; }

    protected CorporateInfo()
    {
    }

    public void Update(
        string? regCapital,
        string? regCapitalCurrency,
        string? actualCapital,
        string? actualCapitalCurrency,
        string? legalPersonName,
        int type,
        string? companyOrgType,
        string? regInstitute,
        string? regNumber,
        string? base1,
        string? regLocation,
        string? regStatus,
        string? businessScope,
        string? industry,
        IndustryAllInfo? industryAll,
        int percentileScore,
        DateTime? approvedTime,
        DateTime? estiblishTime,
        DateTime? fromTime,
        DateTime? toTime,
        DateTime? updateTimes,
        DateTime? cancelDate,
        string? cancelReason,
        DateTime? revokeDate,
        string? revokeReason,
        int isMicroEnt,
        int? socialStaffNum,
        string? staffNumRange,
        string? tags,
        string? taxNumber,
        string? orgNumber,
        string? alias,
        string? property3,
        string? historyNames,
        string[]? historyNameList,
        string[]? emailList,
        string? phoneNumber,
        string? websiteList,
        string? city,
        string? district,
        string? districtCode,
        string? bondNum,
        string? bondName,
        string? bondType,
        string? usedBondName,
        string? bRNNumber,
        string? economicFunctionZone1,
        string? economicFunctionZone2)
    {
        RegCapital = regCapital;
        RegCapitalCurrency = regCapitalCurrency;
        ActualCapital = actualCapital;
        ActualCapitalCurrency = actualCapitalCurrency;
        LegalPersonName = legalPersonName;
        Type = type;
        CompanyOrgType = companyOrgType;
        RegInstitute = regInstitute;
        RegNumber = regNumber;
        Base = base1;
        RegLocation = regLocation;
        RegStatus = regStatus;
        BusinessScope = businessScope;
        Industry = industry;
        IndustryAll = industryAll;
        PercentileScore = percentileScore;
        ApprovedTime = approvedTime;
        EstiblishTime = estiblishTime;
        FromTime = fromTime;
        ToTime = toTime;
        UpdateTimes = updateTimes;
        CancelDate = cancelDate;
        CancelReason = cancelReason;
        RevokeDate = revokeDate;
        RevokeReason = revokeReason;
        IsMicroEnt = isMicroEnt;
        SocialStaffNum = socialStaffNum;
        StaffNumRange = staffNumRange;
        Tags = tags;
        TaxNumber = taxNumber;
        OrgNumber = orgNumber;
        Alias = alias;
        Property3 = property3;
        HistoryNames = historyNames;
        HistoryNameList = historyNameList;
        EmailList = emailList;
        PhoneNumber = phoneNumber;
        WebsiteList = websiteList;
        City = city;
        District = district;
        DistrictCode = districtCode;
        BondNum = bondNum;
        BondName = bondName;
        BondType = bondType;
        UsedBondName = usedBondName;
        BRNNumber = bRNNumber;
        EconomicFunctionZone1 = economicFunctionZone1;
        EconomicFunctionZone2 = economicFunctionZone2;
    }

    public override string ToString()
    {
        return $"""
            企业名称: {Name}, 
            统一社会信用代码: {CreditCode}, 
            法定代表人: {LegalPersonName}, 
            企业类型: {CompanyOrgType}, 
            注册资本: {RegCapital}{(string.IsNullOrEmpty(RegCapitalCurrency) ? "" : $"({RegCapitalCurrency})")}, 
            成立日期: {EstiblishTime?.ToString("yyyy-MM-dd") ?? "未知"}, 
            企业状态: {RegStatus}, 
            所在地: {Base}{(string.IsNullOrEmpty(City) ? "" : $"-{City}")}{(string.IsNullOrEmpty(District) ? "" : $"-{District}")}, 
            行业: {Industry}, 
            评分: {PercentileScore}, 
            经营范围: {(string.IsNullOrEmpty(BusinessScope) ? "无" : BusinessScope.Substring(0, Math.Min(30, BusinessScope.Length)) + (BusinessScope.Length > 30 ? "..." : ""))}, 
            标签: {Tags ?? "无"}"
            """;
    }
}
