using Volo.Abp.EventBus;
using Wallee.Mcp.CorporateInfos.Records;

namespace Wallee.Mcp.CorporateInfos.Events
{
    [EventName("Wallee.Mcp.CorporateInfos.CorporateInfoFetchedEvent")]
    public class CorporateInfoFetchedEvent
    {
        public CorporateInfoRecord Record { get; set; } = default!;
    }
}
