using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo.ViewModels;

namespace Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo;

public class CreateModalModel : McpPageModel
{
    [BindProperty]
    public CreateEditCorporateInfoViewModel ViewModel { get; set; }

    private readonly ICorporateInfoAppService _service;

    public CreateModalModel(ICorporateInfoAppService service)
    {
        _service = service;
    }

    public virtual async Task<IActionResult> OnPostAsync()
    {
        var dto = ObjectMapper.Map<CreateEditCorporateInfoViewModel, CreateUpdateCorporateInfoDto>(ViewModel);
        await _service.CreateAsync(dto);
        return NoContent();
    }
}