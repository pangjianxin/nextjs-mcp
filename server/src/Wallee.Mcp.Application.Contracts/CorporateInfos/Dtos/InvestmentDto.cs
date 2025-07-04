using System;
using System.Collections.Generic;
using System.Text;

namespace Wallee.Mcp.CorporateInfos.Dtos
{
    public class InvestmentDto
    {
        public Guid CorporateInfoId { get; set; }
        /// <summary>
        /// 公司类型
        /// </summary>
        public string? OrgType { get; set; }

        /// <summary>
        /// 经营范围
        /// </summary>
        public string BusinessScope { get; set; } = default!;

        /// <summary>
        /// 投资占比
        /// </summary>
        public string Percent { get; set; } = default!;

        /// <summary>
        /// 企业状态
        /// </summary>
        public string? RegStatus { get; set; }

        /// <summary>
        /// 开业时间
        /// </summary>
        public DateTime? EstiblishTime { get; set; }

        /// <summary>
        /// 法人
        /// </summary>
        public string LegalPersonName { get; set; } = default!;

        /// <summary>
        /// 1-公司 2-人（被投资公司类型）
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 投资金额
        /// </summary>
        public double Amount { get; set; }

        /// <summary>
        /// 公司id
        /// </summary>
        public long ExternalSourceId { get; set; }

        /// <summary>
        /// 行业
        /// </summary>
        public string? Category { get; set; }

        /// <summary>
        /// 注册资金
        /// </summary>
        public string? RegCapital { get; set; }

        /// <summary>
        /// 被投资公司
        /// </summary>
        public string Name { get; set; } = default!;

        /// <summary>
        /// 省份简称
        /// </summary>
        public string Base { get; set; } = default!;

        /// <summary>
        /// 统一社会信用代码
        /// </summary>
        public string CreditCode { get; set; } = default!;

        /// <summary>
        /// 0-无法人 1-人 2-公司（被投资法人类型）
        /// </summary>
        public int PersonType { get; set; }

        /// <summary>
        /// 简称
        /// </summary>
        public string? Alias { get; set; }

        /// <summary>
        /// 投资金额单位
        /// </summary>
        public string AmountSuffix { get; set; } = default!;
    }
}
