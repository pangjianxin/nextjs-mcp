using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Values;

namespace Wallee.Mcp.CorporateReports
{
    /// <summary>
    /// 传输记录
    /// </summary>
    public class TransmissionHistory : ValueObject
    {
        public Guid? UserId { get; set; }
        public string? Date { get; set; }
        public string Email { get; set; } = default!;

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return UserId!;
            yield return Email;
            yield return Date!;
        }
    }
}
