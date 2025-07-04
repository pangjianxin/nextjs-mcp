using AutoFilterer.Extensions;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.BlobStoring;
using Volo.Abp.Content;
using Wallee.Mcp.Blobs;
using Wallee.Mcp.CorporateReports.BackgroundJobs;
using Wallee.Mcp.CorporateReports.Dtos;

namespace Wallee.Mcp.CorporateReports
{
    public class CorporateReportAppService : ReadOnlyAppService<CorporateReport, CorporateReportDto, Guid, CorporateReportGetListInput>, ICorporateReportAppService
    {
        private readonly ICorporateReportRepository _repository;
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly IBlobContainer<CorporateReportContainer> _blobContainer;
        private readonly ReportNameGenerator _reportNameGenerator;

        public CorporateReportAppService(
            ICorporateReportRepository repository,
            IBackgroundJobManager backgroundJobManager,
            IBlobContainer<CorporateReportContainer> blobContainer,
            ReportNameGenerator reportNameGenerator) : base(repository)
        {
            _repository = repository;
            _backgroundJobManager = backgroundJobManager;
            _blobContainer = blobContainer;
            _reportNameGenerator = reportNameGenerator;
        }

        public async Task<CorporateReportDto> CreateAsync(CreateCorporateReportDto input)
        {
            var reportName = _reportNameGenerator.GenerateReportName(input.CompanyUniscId, input.Type);

            var entity = await _repository.FindAsync(it => it.DocumentName == reportName);

            if (entity == default)
            {
                entity = new CorporateReport(GuidGenerator.Create(), input.Type, input.CompanyUniscId, input.CompanyName, reportName);

                await _repository.InsertAsync(entity);
            }

            await _backgroundJobManager.EnqueueAsync(new GenerateCorporateReportJobArgs
            {
                Email = input.Email,
                UserId = CurrentUser.Id,
                CompanyUniscId = input.CompanyUniscId,
                CorporateReportType = input.Type
            }, delay: TimeSpan.FromSeconds(5));

            return await MapToGetOutputDtoAsync(entity);
        }

        public async Task<IRemoteStreamContent> GetDownloadAsync(Guid id)
        {
            var doc = await _repository.GetAsync(id);

            if (!doc.DocumentGenerated)
            {
                throw new UserFriendlyException("该文档暂未生成，请稍后");
            }

            var stream = await _blobContainer.GetAsync(doc.BlobId.ToString()!);

            return new RemoteStreamContent(stream, doc.DocumentName, doc.MediaType);
        }

        protected override async Task<IQueryable<CorporateReport>> CreateFilteredQueryAsync(CorporateReportGetListInput input)
        {
            return (await base.CreateFilteredQueryAsync(input)).ApplyFilter(input);
        }
    }
}
