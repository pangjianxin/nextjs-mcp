using Microsoft.SemanticKernel;
using System;
using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Uow;
using Volo.Abp.Users;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.CorporateInfos.BackgroundJobs;
using Wallee.Mcp.CorporateReports;
using Wallee.Mcp.CorporateReports.BackgroundJobs;
using Wallee.Mcp.Utils;

namespace Wallee.Mcp.Plugins
{
    public class CorporateInfoPlugin
    {
        private readonly ITianYanChaCorporateInfoFetcher _tianYanChaCorporateInfoFetcher;
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly ICorporateInfoRepository _corporateInfoRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public CorporateInfoPlugin(
            IBackgroundJobManager backgroundJobManager,
            ICorporateInfoRepository corporateInfoRepository,
            ICurrentUser currentUser,
            IUnitOfWorkManager unitOfWorkManager,
            ITianYanChaCorporateInfoFetcher tianYanChaCorporateInfoFetcher)
        {
            _backgroundJobManager = backgroundJobManager;
            _corporateInfoRepository = corporateInfoRepository;
            _currentUser = currentUser;
            _unitOfWorkManager = unitOfWorkManager;
            _tianYanChaCorporateInfoFetcher = tianYanChaCorporateInfoFetcher;
        }

        [KernelFunction]
        [Description("通过关键字搜索企业信息")]
        [return: Description("返回搜索到的企业的统一社会信用代码证号")]
        public async Task<string?> SearchAsync(
           [Description("企业信息搜索关键字")] string companyName)
        {
            var existed = await _corporateInfoRepository.FindAsync(it => it.Name.Contains(companyName) || it.CreditCode.Contains(companyName));

            if (existed != default)
            {
                return existed.CreditCode;
            }
            else
            {
                var corporateInfo = await _tianYanChaCorporateInfoFetcher.SearchCorporateInfoAsync(companyName, pageSize: 1);

                if (corporateInfo != default && corporateInfo.Result.Total > 0)
                {
                    return corporateInfo.Result.Items.First().CreditCode;
                }
            }

            return null;
        }

        [KernelFunction]
        [Description("给指定的收件人发送企业信息")]
        [return: Description("返回发送结果")]
        public async Task<string> SendAsync(
           [Description("收件人,发送给谁")] string email,
           [Description("统一社会信用代码证号或简称代码证号")] string creditCode)
        {

            if (!CheckEmail(email))
            {
                return "你给我的邮件地址格式不正确";
            }
            if (!CheckSocialCreditCode(creditCode))
            {
                return "你给我的统一社会信用代码证号格式不正确";
            }

            var generateCorporateReportJobArgs = new GenerateCorporateReportJobArgs
            {
                UserId = _currentUser.Id,
                CompanyUniscId = creditCode,
                CorporateReportType = CorporateReportType.企业基础信息,
                Email = email
            };
            var corporateInfo = await _corporateInfoRepository.FindAsync(it => it.CreditCode == creditCode);
            using var uow = _unitOfWorkManager.Begin();
            if (corporateInfo == default)
            {
                await _backgroundJobManager.EnqueueAsync(new FetchCorporateInfoJobArgs
                {
                    CreditCode = creditCode,
                    GenerateCorporateReportJobArgs = generateCorporateReportJobArgs
                });
            }
            else
            {
                await _backgroundJobManager.EnqueueAsync(generateCorporateReportJobArgs, delay: TimeSpan.FromSeconds(1));
            }

            await uow.SaveChangesAsync();

            return $"(信用代码证号){creditCode},后台正在处理，稍后你会收到一封关于企业信息的PDF邮件，请留意你的邮箱";
        }

        private static bool CheckSocialCreditCode(string code)
        {
            if (code?.Length != 18) return false;
            code = code.ToUpper();
            int[] factor = { 1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28 };
            string str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
            int total = factor.Select((p, i) => p * str.IndexOf(code[i])).Sum();
            int index = total % 31 == 0 ? 0 : 31 - total % 31;
            return str[index] == code.Last();
        }

        private static bool CheckEmail(string email)
        {
            string pattern = @"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$";
            return Regex.IsMatch(email, pattern);
        }
    }
}
