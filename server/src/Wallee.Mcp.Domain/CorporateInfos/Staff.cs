using System;
using Volo.Abp.Domain.Entities;

namespace Wallee.Mcp.CorporateInfos
{
    public class Staff : Entity
    {
        public Guid CorporateInfoId { get; set; }
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

        public override object?[] GetKeys()
        {
            return [CorporateInfoId, ExternalSourceId, Hcgid];
        }
    }
}
