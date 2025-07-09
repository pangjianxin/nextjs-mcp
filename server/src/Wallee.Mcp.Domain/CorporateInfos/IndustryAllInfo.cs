using System.Collections.Generic;
using Volo.Abp.Domain.Values;

namespace Wallee.Mcp.CorporateInfos
{
    /// <summary>
    /// 国民经济行业分类详细信息
    /// </summary>
    public class IndustryAllInfo : ValueObject
    {
        /// <summary>小类行业代码</summary>
        public string? CategoryCodeFourth { get; set; }

        /// <summary>国民经济行业分类中类</summary>
        public string? CategoryMiddle { get; set; }

        /// <summary>国民经济行业分类大类</summary>
        public string? CategoryBig { get; set; }

        /// <summary>门类行业代码</summary>
        public string? CategoryCodeFirst { get; set; }

        /// <summary>国民经济行业分类门类</summary>
        public string? Category { get; set; }

        /// <summary>大类行业代码</summary>
        public string? CategoryCodeSecond { get; set; }

        /// <summary>中类行业代码</summary>
        public string? CategoryCodeThird { get; set; }

        /// <summary>国民经济行业分类小类</summary>
        public string? CategorySmall { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return CategoryCodeFourth ?? string.Empty;
            yield return CategoryMiddle ?? string.Empty;
            yield return CategoryBig ?? string.Empty;
            yield return CategoryCodeFirst ?? string.Empty;
            yield return Category ?? string.Empty;
            yield return CategoryCodeSecond ?? string.Empty;
            yield return CategoryCodeThird ?? string.Empty;
            yield return CategorySmall ?? string.Empty;
        }
    }
}
