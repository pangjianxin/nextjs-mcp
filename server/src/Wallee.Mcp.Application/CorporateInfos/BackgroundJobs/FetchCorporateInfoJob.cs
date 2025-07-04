using System;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Uow;
using Wallee.Mcp.Utils;

namespace Wallee.Mcp.CorporateInfos.BackgroundJobs
{
    public class FetchCorporateInfoJob : AsyncBackgroundJob<FetchCorporateInfoJobArgs>, ITransientDependency
    {
        private readonly ITianYanChaCorporateInfoFetcher _tianYanChaCorporateInfoFetcher;
        private readonly IBackgroundJobManager _backgroundJobManager;

        public FetchCorporateInfoJob(
            ITianYanChaCorporateInfoFetcher tianYanChaCorporateInfoFetcher,
            IBackgroundJobManager backgroundJobManager)
        {
            _tianYanChaCorporateInfoFetcher = tianYanChaCorporateInfoFetcher;
            _backgroundJobManager = backgroundJobManager;
        }
        [UnitOfWork]
        public override async Task ExecuteAsync(FetchCorporateInfoJobArgs args)
        {
            await FetchAsync(args);

            if (args.GenerateCorporateReportJobArgs != default)
            {
                await _backgroundJobManager.EnqueueAsync(args.GenerateCorporateReportJobArgs, delay: TimeSpan.FromSeconds(5));
            }
        }

        private async Task FetchAsync(FetchCorporateInfoJobArgs args)
        {
            await _tianYanChaCorporateInfoFetcher.FetchCorporateInfoAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchStaffsAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchChangeInfosAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchBranchesAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchInvestmentsAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchAdministrativeLicensesAsync(args.CreditCode);

            await _tianYanChaCorporateInfoFetcher.FetchShareholdersAsync(args.CreditCode);
        }
    }
}
