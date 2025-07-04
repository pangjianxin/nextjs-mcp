using System;
using System.Text.Json.Serialization;

namespace Wallee.Mcp.CorporateInfos.Records
{
    public record ShareholderRecord
    {
        public Guid CorporateInfoId { get; set; }

        [JsonPropertyName("id")]
        public long? ExternalSourceId { get; set; }
        /// <summary>
        /// 公司id
        /// </summary>
        public long? Cgid { get; set; }

        /// <summary>
        /// 人员hcgid
        /// </summary>
        public string? Hcgid { get; set; }

        /// <summary>
        /// logo
        /// </summary>
        public string? Logo { get; set; }

        /// <summary>
        /// 股东名
        /// </summary>
        public string Name { get; set; } = default!;

        /// <summary>
        /// 简称
        /// </summary>
        public string? Alias { get; set; }

        /// <summary>
        /// 股东类型 1-公司 2-人 3-其它
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 实缴
        /// </summary>
        public CapitalRecord[]? CapitalActl { get; set; } = default!;
        /// <summary>
        /// 认缴
        /// </summary>
        public CapitalRecord[]? Capital { get; set; } = default!;
    }

    public record CapitalRecord
    {
        /// <summary>
        /// 出资金额
        /// </summary>
        public string Amomon { get; set; } = default!;

        /// <summary>
        /// 出资时间
        /// </summary>
        public DateTime? Time { get; set; }

        /// <summary>
        /// 占比
        /// </summary>
        public string? Percent { get; set; } = default!;

        /// <summary>
        /// 认缴方式
        /// </summary>
        public string? Paymet { get; set; } = default!;
    }
}
