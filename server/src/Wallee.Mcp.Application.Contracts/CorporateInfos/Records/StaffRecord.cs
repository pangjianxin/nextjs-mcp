using System;
using System.Text.Json.Serialization;

namespace Wallee.Mcp.CorporateInfos.Records
{
    public record StaffRecord
    {
        public Guid CorporateInfoId { get; set; }

        [JsonPropertyName("id")]
        public long? ExternalSourceId { get; set; }

        /// <summary>
        /// 人员hcgid
        /// </summary>
        public string? Hcgid { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        public string[]? TypeJoin { get; set; }

        /// <summary>
        /// logo
        /// </summary>
        public string? Logo { get; set; }

        /// <summary>
        /// 2-人
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 主要人员名
        /// </summary>
        public string Name { get; set; } = default!;
    }
}
