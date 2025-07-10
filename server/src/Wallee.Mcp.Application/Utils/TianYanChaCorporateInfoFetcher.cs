using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Volo.Abp;
using Volo.Abp.Json;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Timing;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.CorporateInfos.Dtos;
using Wallee.Mcp.CorporateInfos.Records;

namespace Wallee.Mcp.Utils
{
    public class TianYanChaCorporateInfoFetcher : ITianYanChaCorporateInfoFetcher
    {
        protected readonly ICorporateInfoRepository _repository;
        protected readonly IJsonSerializer _jsonSerializer;
        private readonly IObjectMapper _objectMapper;
        private readonly IClock _clock;
        private readonly HttpClient _httpClient;
        public TianYanChaCorporateInfoFetcher(
            ICorporateInfoRepository corporateInfoRepository,
            IHttpClientFactory httpClientFactory,
            IJsonSerializer jsonSerializer,
            IObjectMapper objectMapper,
            IClock clock)
        {
            _repository = corporateInfoRepository;
            _jsonSerializer = jsonSerializer;
            _objectMapper = objectMapper;
            _clock = clock;
            _httpClient = httpClientFactory.CreateClient(OpenRemoteServiceConsts.TianYanCha);
        }

        public async Task<TianYanChaPagedResult<CorporateSearchInfoRec>?> SearchCorporateInfoAsync(string search, int pageSize = 5)
        {
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, ManipulateUri("/services/open/search/2.0", search, "word", pageSize));
            var response = await _httpClient.SendAsync(requestMessage);
            var res = await response.Content.ReadAsStringAsync();
            var ress = _jsonSerializer.Deserialize<TianYanChaPagedResult<CorporateSearchInfoRec>>(res);
            if (ress.ErrorCode != 0)
            {
                if (ress.ErrorCode == 300000)
                {
                    return null;
                }

                throw new UserFriendlyException(ress.Reason);
            }

            return ress;
        }

        public async Task<CorporateInfoDto> FetchCorporateInfoAsync(string keyWord)
        {
            // 先从数据库查找
            var exists = await _repository.FindAsync(it => it.CreditCode == keyWord || it.Name == keyWord);

            if (exists != null)
            {
                return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(exists);
            }

            // 数据库没有，调用天眼查接口
            var r = await HttpGetResultAsync<CorporateInfoRecord>("/services/open/ic/baseinfoV2/2.0", keyWord);

            if (r != null)
            {
                var entity = _objectMapper.Map<CorporateInfoRecord, CorporateInfo>(r);
                entity = await _repository.InsertAsync(entity);
                return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
            }

            throw new ArgumentException($"{keyWord}没有查找到任何信息");
        }

        //public async Task<CorporateInfoDto> FetchStaffsAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    var records = await HttpGetPagedResultAsync<StaffRecord>("/services/open/ic/staff/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<Staff>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<StaffRecord, Staff>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateStaffs(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}

        /// <summary>
        /// 更新公司股东信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //public async Task<CorporateInfoDto> FetchShareholdersAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    var records = await HttpGetPagedResultAsync<ShareholderRecord>("/services/open/ic/holder/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<Shareholder>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<ShareholderRecord, Shareholder>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateSharedholders(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}
        /// <summary>
        /// 更新分支机构信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //public async Task<CorporateInfoDto> FetchBranchesAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    var records = await HttpGetPagedResultAsync<BranchRecord>("/services/open/ic/branch/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<Branch>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<BranchRecord, Branch>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateBranches(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}
        /// <summary>
        /// 更新公司对外投资信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //public async Task<CorporateInfoDto> FetchInvestmentsAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    List<InvestmentRecord>? records = await HttpGetPagedResultAsync<InvestmentRecord>("/services/open/ic/inverst/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<Investment>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<InvestmentRecord, Investment>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateInvestments(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}
        /// <summary>
        /// 可以通过公司名称或ID获取企业变更记录，变更记录包括工商变更事项、变更前后信息等字段的详细信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //public async Task<CorporateInfoDto> FetchChangeInfosAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    var records = await HttpGetPagedResultAsync<ChangeInfoRecord>("/services/open/ic/changeinfo/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<ChangeInfo>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<ChangeInfoRecord, ChangeInfo>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateChangeInfos(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}
        /// <summary>
        /// 可以通过公司名称或ID获取企业行政许可信息，企业行政许可信息包括许可文件名称、决定许可机关、许可内容、决定日期/有效期自、截止日期/有效期至、数据来源等
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //public async Task<CorporateInfoDto> FetchAdministrativeLicensesAsync(string creditCode)
        //{
        //    var entity = await CheckoutCorporateInfo(creditCode);

        //    var records = await HttpGetPagedResultAsync<AdministrativeLicenseRecord>("/services/open/m/getAdministrativeLicense/2.0", creditCode);

        //    if (records != default && records.Count > 0)
        //    {
        //        var list = new List<AdministrativeLicense>();

        //        foreach (var record in records)
        //        {
        //            list.Add(_objectMapper.Map<AdministrativeLicenseRecord, AdministrativeLicense>(record with { CorporateInfoId = entity.Id }));
        //        }

        //        entity.UpdateAdministrativeLicenses(list);

        //        await _repository.UpdateAsync(entity);
        //    }

        //    return _objectMapper.Map<CorporateInfo, CorporateInfoDto>(entity);
        //}
        protected async Task<List<T>> HttpGetPagedResultAsync<T>(string urlPath, string keyword, string keywordParamName = "keyword", int pageSize = 20, int pageNum = 1,
            List<T>? accumulatedResult = null)
        {
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, ManipulateUri(urlPath, keyword, keywordParamName, pageSize, pageNum));
            var response = await _httpClient.SendAsync(requestMessage);

            var res = await response.Content.ReadAsStringAsync();

            var ress = _jsonSerializer.Deserialize<TianYanChaPagedResult<T>>(res);

            if (ress.ErrorCode != 0)
            {
                if (ress.ErrorCode == 300000)
                {
                    return [];
                }

                throw new UserFriendlyException(ress.Reason);
            }

            if (accumulatedResult == null)
            {
                accumulatedResult = ress.Result.Items;
            }
            else
            {
                accumulatedResult.AddRange(ress.Result.Items);
            }

            if (ress.Result.Total > pageSize * pageNum)
            {
                return await HttpGetPagedResultAsync(urlPath, keyword, keywordParamName, pageSize, pageNum + 1, accumulatedResult);
            }

            return accumulatedResult;
        }

        protected async Task<T> HttpGetResultAsync<T>(string urlPath, string keyword, string keywordParamName = "keyword") where T : class
        {
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, ManipulateUri(urlPath, keyword, keywordParamName));

            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            var res = await response.Content.ReadAsStringAsync();

            var ress = _jsonSerializer.Deserialize<TianYanChaResult<T>>(res);

            if (ress.ErrorCode != 0)
            {
                throw new UserFriendlyException(ress.Reason);
            }

            return ress.Result;

        }

        private string ManipulateUri(string urlPath, string keyword, string keywordParamName = "keyword", int? pageSize = null, int? pageNum = null)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);

            query[keywordParamName] = keyword;

            if (pageSize.HasValue)
            {
                query["pageSize"] = $"{pageSize}";
            }
            if (pageNum.HasValue)
            {
                query["pageNum"] = $"{pageNum}";
            }

            return $"{urlPath}?{query}";
        }

        private async Task<CorporateInfo> CheckoutCorporateInfo(string creditCode)
        {
            var entity = await _repository.FindAsync(it => it.CreditCode == creditCode);

            if (entity == default)
            {
                throw new UserFriendlyException("该企业不存在,请先获取企业基础信息之后再进行操作");
            }

            return entity;
        }
    }
}
