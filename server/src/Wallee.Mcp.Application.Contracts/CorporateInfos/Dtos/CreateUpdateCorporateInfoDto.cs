using System;
using System.Collections.Generic;

namespace Wallee.Mcp.CorporateInfos.Dtos;

[Serializable]
public class CreateUpdateCorporateInfoDto
{
    /// <summary>
    /// 企业ID
    /// </summary>
    public int ExternalId { get; set; }

    /// <summary>
    /// 企业名称
    /// </summary>
    public string Name { get; set; } = default!;

    /// <summary>
    /// 统一社会信用代码
    /// </summary>
    public string CreditCode { get; set; } = default!;

    /// <summary>
    /// 注册资本
    /// </summary>
    public string? RegCapital { get; set; }

    /// <summary>
    /// 注册资本币种（人民币 美元 欧元 等）
    /// </summary>
    public string? RegCapitalCurrency { get; set; }

    /// <summary>
    /// 实收注册资本
    /// </summary>
    public string? ActualCapital { get; set; }

    /// <summary>
    /// 实收注册资本币种（人民币 美元 欧元 等）
    /// </summary>
    public string? ActualCapitalCurrency { get; set; }

    /// <summary>
    /// 法定代表人
    /// </summary>
    public string? LegalPersonName { get; set; }

    /// <summary>
    /// 法人类型，1人 2公司
    /// </summary>
    public int Type { get; set; }

    /// <summary>
    /// 企业类型
    /// </summary>
    public string? CompanyOrgType { get; set; }

    /// <summary>
    /// 登记机关
    /// </summary>
    public string? RegInstitute { get; set; }

    /// <summary>
    /// 注册号
    /// </summary>
    public string? RegNumber { get; set; }

    /// <summary>
    /// 省份简称
    /// </summary>
    public string? Base { get; set; }

    /// <summary>
    /// 注册地址
    /// </summary>
    public string? RegLocation { get; set; }

    /// <summary>
    /// 企业状态
    /// </summary>
    public string? RegStatus { get; set; }

    /// <summary>
    /// 经营范围
    /// </summary>
    public string? BusinessScope { get; set; }

    /// <summary>
    /// 行业
    /// </summary>
    public string? Industry { get; set; }

    /// <summary>
    /// 国民经济行业分类
    /// </summary>
    public IndustryAllInfoDto? IndustryAll { get; set; }

    /// <summary>
    /// 企业评分（万分制）
    /// </summary>
    public int PercentileScore { get; set; }

    /// <summary>
    /// 核准时间
    /// </summary>
    public DateTime? ApprovedTime { get; set; }

    /// <summary>
    /// 成立日期
    /// </summary>
    public DateTime? EstiblishTime { get; set; }

    /// <summary>
    /// 经营开始时间
    /// </summary>
    public DateTime? FromTime { get; set; }

    /// <summary>
    /// 经营结束时间
    /// </summary>
    public DateTime? ToTime { get; set; }

    /// <summary>
    /// 更新时间
    /// </summary>
    public DateTime? UpdateTimes { get; set; }

    /// <summary>
    /// 注销日期
    /// </summary>
    public DateTime? CancelDate { get; set; }

    /// <summary>
    /// 注销原因
    /// </summary>
    public string? CancelReason { get; set; }

    /// <summary>
    /// 吊销日期
    /// </summary>
    public DateTime? RevokeDate { get; set; }

    /// <summary>
    /// 吊销原因
    /// </summary>
    public string? RevokeReason { get; set; }

    /// <summary>
    /// 是否为小微企业 0不是 1是
    /// </summary>
    public int IsMicroEnt { get; set; }

    /// <summary>
    /// 参保人数
    /// </summary>
    public int? SocialStaffNum { get; set; }

    /// <summary>
    /// 人员规模
    /// </summary>
    public string? StaffNumRange { get; set; }

    /// <summary>
    /// 企业标签
    /// </summary>
    public string? Tags { get; set; }

    /// <summary>
    /// 纳税人识别号
    /// </summary>
    public string? TaxNumber { get; set; }

    /// <summary>
    /// 组织机构代码
    /// </summary>
    public string? OrgNumber { get; set; }

    /// <summary>
    /// 简称
    /// </summary>
    public string? Alias { get; set; }

    /// <summary>
    /// 英文名
    /// </summary>
    public string? Property3 { get; set; }

    /// <summary>
    /// 曾用名
    /// </summary>
    public string? HistoryNames { get; set; }

    /// <summary>
    /// 曾用名列表
    /// </summary>
    public List<string>? HistoryNameList { get; set; }

    /// <summary>
    /// 企业邮箱列表
    /// </summary>
    public List<string>? EmailList { get; set; }

    /// <summary>
    /// 企业联系方式
    /// </summary>
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// 企业网址
    /// </summary>
    public string? WebsiteList { get; set; }

    /// <summary>
    /// 市
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// 区
    /// </summary>
    public string? District { get; set; }

    /// <summary>
    /// 行政区划代码
    /// </summary>
    public string? DistrictCode { get; set; }

    /// <summary>
    /// 股票号
    /// </summary>
    public string? BondNum { get; set; }

    /// <summary>
    /// 股票名
    /// </summary>
    public string? BondName { get; set; }

    /// <summary>
    /// 股票类型
    /// </summary>
    public string? BondType { get; set; }

    /// <summary>
    /// 股票曾用名
    /// </summary>
    public string? UsedBondName { get; set; }

    /// <summary>
    /// BRN编号（商业登记号）
    /// </summary>
    public string? BRNNumber { get; set; }

    /// <summary>
    /// 经济行业代码1
    /// </summary>
    public string? EconomicFunctionZone1 { get; set; }

    /// <summary>
    /// 经济行业代码2
    /// </summary>
    public string? EconomicFunctionZone2 { get; set; }
}