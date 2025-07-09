using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using Volo.Abp.Uow;

namespace Wallee.Mcp.SignalR
{
    public class AbpUnitOfWorkHubFilter : IHubFilter
    {
        public virtual async ValueTask<object?> InvokeMethodAsync(HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object?>> next)
        {
            var unitOfWorkManager = invocationContext.ServiceProvider.GetRequiredService<IUnitOfWorkManager>();

            using (var uow = unitOfWorkManager.Reserve(UnitOfWork.UnitOfWorkReservationName, requiresNew: true))
            {
                var result = await next(invocationContext);

                await uow.CompleteAsync();

                return result;
            }
        }
    }

}
