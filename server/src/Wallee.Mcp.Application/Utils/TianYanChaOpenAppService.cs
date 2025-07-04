using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Json;

namespace Wallee.Mcp.Utils
{
    public abstract class TianYanChaOpenAppService<TEntity, TEntityDto, TKey, TGetListInput> : ReadOnlyAppService<TEntity, TEntityDto, TKey, TGetListInput>
        where TEntity : class, IEntity<TKey>
        where TEntityDto : IEntityDto<TKey>
    {
        protected readonly IRepository<TEntity, TKey> _repository;
        protected readonly IJsonSerializer _jsonSerializer;

        protected HttpClient HttpClient { get; }
        public TianYanChaOpenAppService(
            IRepository<TEntity, TKey> repository,
            IHttpClientFactory httpClientFactory,
            IJsonSerializer jsonSerializer
            ) : base(repository)
        {
            HttpClient = httpClientFactory.CreateClient(OpenRemoteServiceConsts.TianYanCha);
            _repository = repository;
            _jsonSerializer = jsonSerializer;
        }


        protected async Task<List<T>> HttpGetPagedResultAsync<T>(string urlPath, string keyword, int pageSize = 20, int pageNum = 1,
            List<T>? accumulatedResult = null)
        {
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, ManipulateUri(urlPath, keyword, pageSize, pageNum));

            var response = await HttpClient.SendAsync(requestMessage);

            var res = await response.Content.ReadAsStringAsync();

            var ress = _jsonSerializer.Deserialize<TianYanChaPagedResult<T>>(res);

            if (ress.ErrorCode != 0)
            {
                if (ress.ErrorCode == 3000)
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
                return await HttpGetPagedResultAsync(urlPath, keyword, pageSize, pageNum + 1, accumulatedResult);
            }

            return accumulatedResult;
        }

        protected async Task<T> HttpGetResultAsync<T>(string urlPath, string keyword) where T : class
        {
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, ManipulateUri(urlPath, keyword));

            var response = await HttpClient.SendAsync(requestMessage);

            response.EnsureSuccessStatusCode();

            var res = await response.Content.ReadAsStringAsync();

            var ress = _jsonSerializer.Deserialize<TianYanChaResult<T>>(res);

            if (ress.ErrorCode != 0)
            {
                throw new UserFriendlyException(ress.Reason);
            }

            return ress.Result;

        }

        private string ManipulateUri(string urlPath, string keyword, int? pageSize = null, int? pageNum = null)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);

            query["keyword"] = keyword;

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
    }
}
