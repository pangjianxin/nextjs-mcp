using System;
using System.Text.Json.Serialization;
using Volo.Abp.Timing;
using Wallee.Mcp.Utils.JsonConverters;

namespace Wallee.Mcp.CorporateInfos.Records
{
    public record BranchRecord
    {
        public Guid CorporateInfoId { get; set; }
        /// <summary>
        /// logo
        /// </summary>
        public string? Logo { get; set; }

        /// <summary>
        /// 简称
        /// </summary>
        public string? Alias { get; set; }

        /// <summary>
        /// 开业时间
        /// </summary>
        [DisableDateTimeNormalization]
        [JsonConverter(typeof(TimestampToNullableDatetimeConverter))]
        public DateTime? EstiblishTime { get; set; }

        /// <summary>
        /// 企业状态
        /// </summary>
        public string? RegStatus { get; set; }

        /// <summary>
        /// 法人
        /// </summary>
        public string LegalPersonName { get; set; } = default!;

        /// <summary>
        /// 公司id
        /// </summary>
        [JsonPropertyName("id")]
        public long ExternalSourceId { get; set; }

        /// <summary>
        /// 行业code
        /// </summary>
        public string? Category { get; set; }

        /// <summary>
        /// 注册资金
        /// </summary>
        public string? RegCapital { get; set; }

        /// <summary>
        /// 公司名
        /// </summary>
        public string Name { get; set; } = default!;

        /// <summary>
        /// 省份简称
        /// </summary>
        public string? Base { get; set; }
    }
}
