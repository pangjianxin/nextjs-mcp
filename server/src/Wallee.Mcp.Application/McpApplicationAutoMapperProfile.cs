using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.CorporateInfos.Dtos;
using AutoMapper;
using Wallee.Mcp.CorporateInfos.Records;

namespace Wallee.Mcp;

public class McpApplicationAutoMapperProfile : Profile
{
    public McpApplicationAutoMapperProfile()
    {
        CreateMap<CorporateInfo, CorporateInfoDto>();
        CreateMap<CorporateInfoRecord, CorporateInfo>();
        CreateMap<IndustryAllInfo, IndustryAllInfoDto>();
        CreateMap<IndustryAllRecord, IndustryAllInfo>();
    }
}
