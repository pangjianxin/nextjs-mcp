using QuestPDF.Fluent;
using System;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.BlobStoring;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Uow;
using Volo.Abp.VirtualFileSystem;
using Wallee.Mcp.Blobs;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.Documents;

namespace Wallee.Mcp.CorporateReports.BackgroundJobs
{
    public class GenerateCorporateReportJob : AsyncBackgroundJob<GenerateCorporateReportJobArgs>, ITransientDependency
    {
        private readonly ICorporateInfoRepository _corporateInfoRepository;
        private readonly IGuidGenerator _guidGenerator;
        private readonly ICorporateReportRepository _corporateReportRepository;
        private readonly IVirtualFileProvider _virtualFileProvider;
        private readonly IBlobContainer<CorporateReportContainer> _blobContainer;
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly ReportNameGenerator _reportNameGenerator;

        public GenerateCorporateReportJob(
            IGuidGenerator guidGenerator,
            ICorporateReportRepository corporateReportRepository,
            IVirtualFileProvider virtualFileProvider,
            IBlobContainer<CorporateReportContainer> blobContainer,
            IBackgroundJobManager backgroundJobManager,
            ReportNameGenerator reportNameGenerator,
            ICorporateInfoRepository corporateInfoRepository)
        {

            _corporateInfoRepository = corporateInfoRepository;
            _guidGenerator = guidGenerator;
            _corporateReportRepository = corporateReportRepository;
            _virtualFileProvider = virtualFileProvider;
            _blobContainer = blobContainer;
            _backgroundJobManager = backgroundJobManager;
            _reportNameGenerator = reportNameGenerator;
        }

        [UnitOfWork]
        public override async Task ExecuteAsync(GenerateCorporateReportJobArgs args)
        {
            var corporateInfo = await _corporateInfoRepository.FindAsync(it => it.CreditCode == args.CompanyUniscId);

            if (corporateInfo == default)
            {
                return;
            }

            await HandleCorporateReportAsync(corporateInfo, args.Email, args.UserId, args.CorporateReportType);
        }

        public async Task HandleCorporateReportAsync(CorporateInfo corporateInfo, string emailTo, Guid? userId, CorporateReportType reportType)
        {
            var documentName = _reportNameGenerator.GenerateReportName(corporateInfo.CreditCode, reportType);
            CorporateReport? report = await _corporateReportRepository.FindAsync(it => it.DocumentName == documentName);

            if (report == default)
            {
                report = new CorporateReport(_guidGenerator.Create(), reportType, corporateInfo.CreditCode, corporateInfo.Name, documentName);
                await GenerateCorporateInfoPdf(corporateInfo, report);
                await _corporateReportRepository.InsertAsync(report);
            }
            else if (!report.DocumentGenerated)
            {
                await GenerateCorporateInfoPdf(corporateInfo, report);
                await _corporateReportRepository.UpdateAsync(report);
            }

            await _backgroundJobManager.EnqueueAsync(new SendCorporateReportJobArgs
            {
                CorporateReportId = report.Id,
                Subject = $"【{corporateInfo.Name}】企业信息报告",
                Body = "您好，你于今日在我平台申请的关于该企业的基础工商信息报告已生成，请点击附件进行下载查看",
                EmailTo = emailTo,
                UserId = userId!.Value
            });
        }

        private async Task GenerateCorporateInfoPdf(CorporateInfo corporateInfo, CorporateReport report)
        {
            var corporateInfoDocument = new CorporateInfoDocument(report.DocumentName!, _virtualFileProvider, corporateInfo);
            var bytesPdf = corporateInfoDocument.GeneratePdf();
            var blobId = Guid.NewGuid();
            await _blobContainer.SaveAsync(blobId.ToString(), bytesPdf, true);
            report.UpdateBlobInfo(blobId, "application/pdf", bytesPdf.Length);
        }
    }
}
