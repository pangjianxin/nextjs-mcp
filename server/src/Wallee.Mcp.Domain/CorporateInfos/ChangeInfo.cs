using System;
using Volo.Abp.Domain.Entities;

namespace Wallee.Mcp.CorporateInfos
{
    public class ChangeInfo : Entity
    {
        public Guid CorporateInfoId { get; set; }
        /// <summary>
        /// 变更事项
        /// </summary>
        public string ChangeItem { get; set; } = default!;

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 变更前
        /// </summary>
        public string ContentBefore { get; set; } = default!;

        /// <summary>
        /// 变更后
        /// </summary>
        public string ContentAfter { get; set; } = default!;

        /// <summary>
        /// 变更时间
        /// </summary>
        public DateTime? ChangeTime { get; set; }

        public override object?[] GetKeys()
        {
            return [CorporateInfoId];
        }
    }
}
