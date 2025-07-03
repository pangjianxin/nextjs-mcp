using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Volo.Abp.AspNetCore.Mvc;

namespace Wallee.Mcp.Controllers
{
    public class SampleController : AbpController
    {
        private readonly Kernel _kernel;

        public SampleController(
            Kernel kernel,
            [FromKeyedServices("")] ChatCompletionAgent agent)
        {
            _kernel = kernel;
        }
    }
}
