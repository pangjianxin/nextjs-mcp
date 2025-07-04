using System.IO;
using System.Net.Mail;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.BlobStoring;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MailKit;
using Volo.Abp.Timing;
using Volo.Abp.Uow;
using Wallee.Mcp.Blobs;

namespace Wallee.Mcp.CorporateReports.BackgroundJobs
{
    public class SendCorporateReportsJob : AsyncBackgroundJob<SendCorporateReportJobArgs>, ITransientDependency
    {
        private readonly IMailKitSmtpEmailSender _mailKitSmtpEmailSender;
        private readonly ICorporateReportRepository _corporateReportRepository;
        private readonly IBlobContainer<CorporateReportContainer> _blobContainer;
        private readonly IClock _clock;

        public SendCorporateReportsJob(
            IMailKitSmtpEmailSender mailKitSmtpEmailSender,
            ICorporateReportRepository corporateReportRepository,
            IBlobContainer<CorporateReportContainer> blobContainer,
            IClock clock)
        {
            _mailKitSmtpEmailSender = mailKitSmtpEmailSender;
            _corporateReportRepository = corporateReportRepository;
            _blobContainer = blobContainer;
            _clock = clock;
        }

        [UnitOfWork]
        public override async Task ExecuteAsync(SendCorporateReportJobArgs args)
        {
            var doc = await _corporateReportRepository.GetAsync(args.CorporateReportId);
            var fileName = $"{doc.DocumentName}.pdf";
            using Stream bytesPdf = await _blobContainer.GetAsync(doc.BlobId.ToString()!);

            var mailMessage = new MailMessage
            {
                To = { args.EmailTo },
                Subject = args.Subject,
                Body = args.Body,
                IsBodyHtml = false
            };

            mailMessage.Attachments.Add(new Attachment(bytesPdf, fileName, MimeTypes.GetMimeType(fileName)));

            await _mailKitSmtpEmailSender.SendAsync(mailMessage);

            doc.UpdateDownloadHistory(new TransmissionHistory
            {
                UserId = args.UserId,
                Email = args.EmailTo,
                Date = _clock.Now.ToString("yyyy-MM-dd")
            });
            await _corporateReportRepository.UpdateAsync(doc);
        }
    }
}
