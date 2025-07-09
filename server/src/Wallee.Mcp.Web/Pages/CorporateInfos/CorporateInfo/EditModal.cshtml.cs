using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo.ViewModels;

namespace Wallee.Mcp.Web.Pages.CorporateInfos.CorporateInfo;

public class EditModalModel : McpPageModel
{
    [HiddenInput]
    [BindProperty(SupportsGet = true)]
    public Guid Id { get; set; }

    [BindProperty]
    public CreateEditCorporateInfoViewModel ViewModel { get; set; }

    private readonly ICorporateInfoAppService _service;

    public EditModalModel(ICorporateInfoAppService service)
    {
        _service = service;
    }

    public virtual async Task OnGetAsync()
    {
        var dto = await _service.GetAsync(Id);
        ViewModel = ObjectMapper.Map<CorporateInfoDto, CreateEditCorporateInfoViewModel>(dto);
    }

    public virtual async Task<IActionResult> OnPostAsync()
    {
        var dto = ObjectMapper.Map<CreateEditCorporateInfoViewModel, CreateUpdateCorporateInfoDto>(ViewModel);
        await _service.UpdateAsync(Id, dto);
        return NoContent();
    }
}