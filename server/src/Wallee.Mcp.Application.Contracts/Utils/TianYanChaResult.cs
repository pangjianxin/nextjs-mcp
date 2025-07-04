using System.Text.Json.Serialization;

namespace Wallee.Mcp.Utils
{

    public class TianYanChaResult<T> where T : class
    {
        [JsonPropertyName("error_code")]
        public int ErrorCode { get; set; }

        public string Reason { get; set; } = default!;

        public T Result { get; set; } = default!;
    }
}
