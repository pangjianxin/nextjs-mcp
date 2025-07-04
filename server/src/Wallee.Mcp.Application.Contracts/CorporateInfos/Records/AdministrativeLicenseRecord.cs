using System;
using System.Text.Json.Serialization;
using Volo.Abp.Timing;
using Wallee.Mcp.Utils.JsonConverters;

namespace Wallee.Mcp.CorporateInfos.Records
{
    public record AdministrativeLicenseRecord
    {
        public Guid CorporateInfoId { get; set; }
        /// <summary>
        /// 决定日期/有效期自
        /// </summary>
        [DisableDateTimeNormalization]
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        public DateTime? DecisionDate { get; set; }

        /// <summary>
        /// 截止日期/有效期至
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// 许可文件编号/文书号
        /// </summary>
        public string LicenseNumber { get; set; } = default!;

        /// <summary>
        /// 许可文件名称
        /// </summary>
        public string LicenceName { get; set; } = default!;

        /// <summary>
        /// 决定许可机关
        /// </summary>
        public string LicenceDepartment { get; set; } = default!;

        /// <summary>
        /// 许可内容
        /// </summary>
        public string LicenceContent { get; set; } = default!;

        /// <summary>
        /// 数据来源
        /// </summary>
        public string? Source { get; set; }

        /// <summary>
        /// 审核类型（source=信用中国时返回数据）
        /// </summary>
        public string? AuditType { get; set; }

        /// <summary>
        /// 法定代表人（source=信用中国时返回数据）
        /// </summary>
        public string? LegalPersonName { get; set; }

        /// <summary>
        /// 地方编码（source=信用中国时返回数据）
        /// </summary>
        public string? AreaCode { get; set; }

        /// <summary>
        /// 数据更新时间（source=信用中国时返回数据）
        /// </summary>
        public DateTime? DataUpdateTime { get; set; }
    }
}
