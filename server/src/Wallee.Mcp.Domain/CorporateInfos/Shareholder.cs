using System;
using Volo.Abp.Domain.Entities;

namespace Wallee.Mcp.CorporateInfos
{
    public class Shareholder : Entity
    {
        public Guid CorporateInfoId { get; private set; }
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
        public Capital[] CapitalActl { get; set; } = default!;
        /// <summary>
        /// 认缴
        /// </summary>
        public Capital[] Capital { get; set; } = default!;

        public override object?[] GetKeys()
        {
            return [CorporateInfoId, Cgid, Hcgid];
        }
    }
    public class Capital
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
