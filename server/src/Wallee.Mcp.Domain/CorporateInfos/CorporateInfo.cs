using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Wallee.Mcp.CorporateInfos
{
    public class CorporateInfo : AuditedAggregateRoot<Guid>
    {
        private CorporateInfo()
        {

        }
        public CorporateInfo(Guid id, string name, string creditCode, string? regCapital,
            string legalPersonName, int percentileScore, DateTime? estiblishTime, string regLocation) : base(id)
        {
            Name = name;
            CreditCode = creditCode;
            RegCapital = regCapital;
            LegalPersonName = legalPersonName;
            PercentileScore = percentileScore;
            EstiblishTime = estiblishTime;
            RegLocation = regLocation;
        }

        public void Update(
            string? staffNumRange,
            DateTime? fromTime,
            int type,
            string? bondName,
            long externalSourceId,
            int isMicroEnt,
            string? usedBondName,
            string? regNumber,
            int percentileScore,
            string? regCapital,
            string name,
            string? regInstitute,
            string regLocation,
            string? industry,
            DateTime? approvedTime,
            int? socialStaffNum,
            string? tags,
            string? taxNumber,
            string businessScope,
            string? property3,
            string? alias,
            string? orgNumber,
            string? regStatus,
            DateTime? estiblishTime,
            DateTime? updateTimes,
            string? bondType,
            string legalPersonName,
            DateTime? toTime,
            string? actualCapital,
            string? companyOrgType,
            string? email,
            string? websiteList,
            string? phoneNumber,
            string @base,
            string? historyNames,
            List<string>? historyNameList,
            string? bondNum,
            string? regCapitalCurrency,
            string? actualCapitalCurrency,
            DateTime? revokeDate,
            string? revokeReason,
            DateTime? cancelDate,
            string? cancelReason,
            string? city,
            string? district,
            string? category,
            string? categoryBig,
            string? categoryMiddle,
            string? categorySmall)
        {
            StaffNumRange = staffNumRange;
            FromTime = fromTime;
            Type = type;
            BondName = bondName;
            ExternalSourceId = externalSourceId;
            IsMicroEnt = isMicroEnt;
            UsedBondName = usedBondName;
            RegNumber = regNumber;
            PercentileScore = percentileScore;
            RegCapital = regCapital;
            Name = name;
            RegInstitute = regInstitute;
            RegLocation = regLocation;
            Industry = industry;
            ApprovedTime = approvedTime;
            SocialStaffNum = socialStaffNum;
            Tags = tags;
            TaxNumber = taxNumber;
            BusinessScope = businessScope;
            Property3 = property3;
            Alias = alias;
            OrgNumber = orgNumber;
            RegStatus = regStatus;
            EstiblishTime = estiblishTime;
            UpdateTimes = updateTimes;
            BondType = bondType;
            LegalPersonName = legalPersonName;
            ToTime = toTime;
            ActualCapital = actualCapital;
            CompanyOrgType = companyOrgType;
            Email = email;
            WebsiteList = websiteList;
            PhoneNumber = phoneNumber;
            Base = @base;
            HistoryNames = historyNames;
            HistoryNameList = historyNameList;
            BondNum = bondNum;
            RegCapitalCurrency = regCapitalCurrency;
            ActualCapitalCurrency = actualCapitalCurrency;
            RevokeDate = revokeDate;
            RevokeReason = revokeReason;
            CancelDate = cancelDate;
            CancelReason = cancelReason;
            City = city;
            District = district;
            Category = category;
            CategoryBig = categoryBig;
            CategoryMiddle = categoryMiddle;
            CategorySmall = categorySmall;
        }

        /// <summary>
        /// 人员规模
        /// </summary>
        public string? StaffNumRange { get; private set; }

        /// <summary>
        /// 经营开始时间
        /// </summary>
        public DateTime? FromTime { get; private set; } = default;

        /// <summary>
        /// 法人类型，1 人 2 公司
        /// </summary>
        public int Type { get; private set; }

        /// <summary>
        /// 股票名
        /// </summary>
        public string? BondName { get; private set; }

        /// <summary>
        /// 企业id
        /// </summary>
        public long ExternalSourceId { get; private set; }

        /// <summary>
        /// 是否是小微企业 0不是 1是
        /// </summary>
        public int IsMicroEnt { get; private set; }

        /// <summary>
        /// 股票曾用名
        /// </summary>
        public string? UsedBondName { get; private set; }

        /// <summary>
        /// 注册号
        /// </summary>
        public string? RegNumber { get; private set; }

        /// <summary>
        /// 企业评分
        /// </summary>
        public int PercentileScore { get; private set; }

        /// <summary>
        /// 注册资本
        /// </summary>
        public string? RegCapital { get; private set; }

        /// <summary>
        /// 企业名
        /// </summary>
        public string Name { get; private set; } = default!;

        /// <summary>
        /// 登记机关
        /// </summary>
        public string? RegInstitute { get; private set; }

        /// <summary>
        /// 注册地址
        /// </summary>
        public string RegLocation { get; private set; } = default!;

        /// <summary>
        /// 行业
        /// </summary>
        public string? Industry { get; private set; }

        /// <summary>
        /// 核准时间
        /// </summary>
        public DateTime? ApprovedTime { get; private set; } = default;

        /// <summary>
        /// 参保人数
        /// </summary>
        public int? SocialStaffNum { get; private set; }

        /// <summary>
        /// 企业标签
        /// </summary>
        public string? Tags { get; private set; }

        /// <summary>
        /// 纳税人识别号
        /// </summary>
        public string? TaxNumber { get; private set; }

        /// <summary>
        /// 经营范围
        /// </summary>
        public string BusinessScope { get; private set; } = default!;

        /// <summary>
        /// 英文名
        /// </summary>
        public string? Property3 { get; private set; }

        /// <summary>
        /// 简称
        /// </summary>
        public string? Alias { get; private set; }

        /// <summary>
        /// 组织机构代码
        /// </summary>
        public string? OrgNumber { get; private set; }

        /// <summary>
        /// 企业状态
        /// </summary>
        public string? RegStatus { get; private set; }

        /// <summary>
        /// 成立日期
        /// </summary>
        public DateTime? EstiblishTime { get; private set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime? UpdateTimes { get; private set; }

        /// <summary>
        /// 股票类型
        /// </summary>
        public string? BondType { get; private set; }

        /// <summary>
        /// 法人
        /// </summary>
        public string LegalPersonName { get; private set; } = default!;

        /// <summary>
        /// 经营结束时间
        /// </summary>
        public DateTime? ToTime { get; private set; }

        /// <summary>
        /// 实收注册资金
        /// </summary>
        public string? ActualCapital { get; private set; }

        /// <summary>
        /// 企业类型
        /// </summary>
        public string? CompanyOrgType { get; private set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string? Email { get; private set; }
        /// <summary>
        /// 网址
        /// </summary>
        public string? WebsiteList { get; private set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string? PhoneNumber { get; private set; }

        /// <summary>
        /// 省份简称
        /// </summary>
        public string Base { get; private set; } = default!;

        /// <summary>
        /// 统一社会信用代码
        /// </summary>
        public string CreditCode { get; private set; } = default!;

        /// <summary>
        /// 曾用名
        /// </summary>
        public string? HistoryNames { get; private set; }

        public List<string>? HistoryNameList { get; private set; }

        /// <summary>
        /// 股票号
        /// </summary>
        public string? BondNum { get; private set; }

        /// <summary>
        /// 注册资本币种 人民币 美元 欧元 等
        /// </summary>
        public string? RegCapitalCurrency { get; private set; }

        /// <summary>
        /// 实收注册资本币种 人民币 美元 欧元 等
        /// </summary>
        public string? ActualCapitalCurrency { get; private set; }

        /// <summary>
        /// 吊销日期
        /// </summary>

        public DateTime? RevokeDate { get; private set; }

        /// <summary>
        /// 吊销原因
        /// </summary>
        public string? RevokeReason { get; private set; }

        /// <summary>
        /// 注销日期
        /// </summary>
        public DateTime? CancelDate { get; private set; }

        /// <summary>
        /// 注销原因
        /// </summary>
        public string? CancelReason { get; private set; }

        /// <summary>
        /// 市
        /// </summary>
        public string? City { get; private set; }

        /// <summary>
        /// 区
        /// </summary>
        public string? District { get; private set; }

        /// <summary>
        /// 国民经济行业分类门类
        /// </summary>
        public string? Category { get; private set; }

        /// <summary>
        /// 国民经济行业分类大类
        /// </summary>
        public string? CategoryBig { get; private set; }

        /// <summary>
        /// 国民经济行业分类中类
        /// </summary>
        public string? CategoryMiddle { get; private set; }

        /// <summary>
        /// 国民经济行业分类小类
        /// </summary>
        public string? CategorySmall { get; private set; }

        /// <summary>
        /// 股东信息
        /// </summary>
        public List<Shareholder>? Shareholders { get; private set; }
        /// <summary>
        /// 主要人员
        /// </summary>
        public List<Staff>? Staffs { get; private set; }
        /// <summary>
        /// 分支机构
        /// </summary>
        public List<Branch>? Branches { get; private set; }
        /// <summary>
        /// 对外投资
        /// </summary>
        public List<Investment>? Investments { get; private set; }
        /// <summary>
        /// 变更记录
        /// </summary>
        public List<ChangeInfo>? ChangeInfos { get; private set; }
        /// <summary>
        /// 行政许可
        /// </summary>
        public List<AdministrativeLicense>? AdministrativeLicenses { get; private set; }

        public void UpdateSharedholders(List<Shareholder>? shareholders)
        {
            Shareholders = shareholders ?? [];
        }

        public void UpdateStaffs(List<Staff>? staffs)
        {
            Staffs = staffs ?? [];
        }

        public void UpdateBranches(List<Branch>? branches)
        {
            Branches = branches ?? [];
        }

        public void UpdateInvestments(List<Investment>? investments)
        {
            Investments = investments ?? [];
        }

        public void UpdateChangeInfos(List<ChangeInfo>? changeInfos)
        {
            ChangeInfos = changeInfos ?? [];
        }

        public void UpdateAdministrativeLicenses(List<AdministrativeLicense>? administrativeLicenses)
        {
            AdministrativeLicenses = administrativeLicenses ?? [];
        }
    }
}
