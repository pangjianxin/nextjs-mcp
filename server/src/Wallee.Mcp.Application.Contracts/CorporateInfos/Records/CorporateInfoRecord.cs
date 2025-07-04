using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Volo.Abp.Timing;
using Wallee.Mcp.Utils.JsonConverters;

namespace Wallee.Mcp.CorporateInfos.Records
{
    public record CorporateInfoRecord
    {
        /// <summary>
        /// 企业评分
        /// </summary>
        public int PercentileScore { get; set; }

        /// <summary>
        /// 人员规模
        /// </summary>
        public string? StaffNumRange { get; set; }

        /// <summary>
        /// 经营开始时间
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? FromTime { get; set; } = default;

        /// <summary>
        /// 法人类型，1 人 2 公司
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 股票名
        /// </summary>
        public string? BondName { get; set; }

        /// <summary>
        /// 企业id
        /// </summary>
        [JsonPropertyName("id")]
        public long ExternalSourceId { get; set; }

        /// <summary>
        /// 是否是小微企业 0不是 1是
        /// </summary>
        public int IsMicroEnt { get; set; }

        /// <summary>
        /// 股票曾用名
        /// </summary>
        public string? UsedBondName { get; set; }

        /// <summary>
        /// 注册号
        /// </summary>
        public string? RegNumber { get; set; }



        /// <summary>
        /// 注册资本
        /// </summary>
        public string? RegCapital { get; set; }

        /// <summary>
        /// 企业名
        /// </summary>
        public string Name { get; set; } = default!;

        /// <summary>
        /// 登记机关
        /// </summary>
        public string? RegInstitute { get; set; }

        /// <summary>
        /// 注册地址
        /// </summary>
        public string RegLocation { get; set; } = default!;

        /// <summary>
        /// 行业
        /// </summary>
        public string? Industry { get; set; }

        /// <summary>
        /// 核准时间
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? ApprovedTime { get; set; } = default;

        /// <summary>
        /// 更新时间
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? UpdateTimes { get; set; }

        /// <summary>
        /// 参保人数
        /// </summary>
        public int? SocialStaffNum { get; set; }

        /// <summary>
        /// 企业标签
        /// </summary>
        public string? Tags { get; set; }

        /// <summary>
        /// 纳税人识别号
        /// </summary>
        public string? TaxNumber { get; set; }

        /// <summary>
        /// 经营范围
        /// </summary>
        public string BusinessScope { get; set; } = default!;

        /// <summary>
        /// 英文名
        /// </summary>
        public string? Property3 { get; set; }

        /// <summary>
        /// 简称
        /// </summary>
        public string? Alias { get; set; }

        /// <summary>
        /// 组织机构代码
        /// </summary>
        public string? OrgNumber { get; set; }

        /// <summary>
        /// 企业状态
        /// </summary>
        public string? RegStatus { get; set; }

        /// <summary>
        /// 成立日期
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? EstiblishTime { get; set; }



        /// <summary>
        /// 股票类型
        /// </summary>
        public string? BondType { get; set; }

        /// <summary>
        /// 法人
        /// </summary>
        public string LegalPersonName { get; set; } = default!;

        /// <summary>
        /// 经营结束时间
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? ToTime { get; set; }

        /// <summary>
        /// 实收注册资金
        /// </summary>
        public string? ActualCapital { get; set; }

        /// <summary>
        /// 企业类型
        /// </summary>
        public string? CompanyOrgType { get; set; }

        /// <summary>
        /// 省份简称
        /// </summary>
        public string Base { get; set; } = default!;

        /// <summary>
        /// 统一社会信用代码
        /// </summary>
        public string CreditCode { get; set; } = default!;

        /// <summary>
        /// 曾用名
        /// </summary>
        public string? HistoryNames { get; set; }

        public List<string>? HistoryNameList { get; set; }

        /// <summary>
        /// 股票号
        /// </summary>
        public string? BondNum { get; set; }

        /// <summary>
        /// 注册资本币种 人民币 美元 欧元 等
        /// </summary>
        public string? RegCapitalCurrency { get; set; }

        /// <summary>
        /// 实收注册资本币种 人民币 美元 欧元 等
        /// </summary>
        public string? ActualCapitalCurrency { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string? Email { get; set; }
        /// <summary>
        /// 网址
        /// </summary>
        public string? WebsiteList { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// 吊销日期
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? RevokeDate { get; set; }

        /// <summary>
        /// 吊销原因
        /// </summary>
        public string? RevokeReason { get; set; }

        /// <summary>
        /// 注销日期
        /// </summary>
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        [DisableDateTimeNormalization]
        public DateTime? CancelDate { get; set; }

        /// <summary>
        /// 注销原因
        /// </summary>
        public string? CancelReason { get; set; }

        /// <summary>
        /// 市
        /// </summary>
        public string? City { get; set; }

        /// <summary>
        /// 区
        /// </summary>
        public string? District { get; set; }

        public IndustryRecord? IndustryAll { get; set; }
    }

    public record IndustryRecord
    {
        /// <summary>
        /// 国民经济行业分类门类
        /// </summary>
        public string? Category { get; init; }

        /// <summary>
        /// 国民经济行业分类大类
        /// </summary>
        public string? CategoryBig { get; init; }

        /// <summary>
        /// 国民经济行业分类中类
        /// </summary>
        public string? CategoryMiddle { get; init; }

        /// <summary>
        /// 国民经济行业分类小类
        /// </summary>
        public string? CategorySmall { get; init; }
    }
}
