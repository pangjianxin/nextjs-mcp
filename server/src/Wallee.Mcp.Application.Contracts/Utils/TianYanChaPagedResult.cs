using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Wallee.Mcp.Utils
{
    public class TianYanChaPagedResult<T>
    {
        [JsonPropertyName("error_code")]
        public int ErrorCode { get; set; }
        public string Reason { get; set; } = default!;

        public TianYanChaPagedResultItems<T> Result { get; set; } = default!;
    }
    public class TianYanChaPagedResultItems<T>
    {
        public long Total { get; set; }
        public List<T> Items { get; set; } = default!;
    }
}
