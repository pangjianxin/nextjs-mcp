using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Wallee.Mcp.Utils.JsonConverters
{
    public class TimestampToNullableDatetimeConverter : JsonConverter<DateTime?>
    {
        public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Number)
            {
                if (reader.TryGetInt64(out long timestamp))
                {
                    return DateTimeOffset.FromUnixTimeMilliseconds(timestamp).DateTime;
                }
            }
            if (reader.TokenType == JsonTokenType.String)
            {
                if (long.TryParse(reader.GetString(), out long timestamp))
                {
                    return DateTimeOffset.FromUnixTimeMilliseconds(timestamp).DateTime;
                }
            }

            return default;
        }

        public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
        {
            //var timestamp = new DateTimeOffset(value).ToUnixTimeMilliseconds();
            //writer.WriteNumberValue(timestamp);
            throw new NotImplementedException();
        }
    }
}
