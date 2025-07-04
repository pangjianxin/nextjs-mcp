using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.MongoDB;
using Volo.Abp.MongoDB;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.Mongo.MongoDb;

namespace Wallee.Mcp.Mongo.CorporateInfos
{
    public class MongoDbCorporateInfoRepository : MongoDbRepository<OpenaiMongoDbContext, CorporateInfo, Guid>, ICorporateInfoRepository
    {
        public MongoDbCorporateInfoRepository(IMongoDbContextProvider<OpenaiMongoDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<CorporateInfo> UpsertAsync(CorporateInfo corporateInfo)
        {
            TrySetGuidId(corporateInfo);
            AuditPropertySetter.SetModificationProperties(corporateInfo);

            var filter = Builders<CorporateInfo>.Filter.Eq(it => it.CreditCode, corporateInfo.CreditCode);
            var update = Builders<CorporateInfo>.Update
                .Set(it => it.Name, corporateInfo.Name)
                .Set(it => it.StaffNumRange, corporateInfo.StaffNumRange)
                .Set(it => it.FromTime, corporateInfo.FromTime)
                .Set(it => it.Type, corporateInfo.Type)
                .Set(it => it.BondName, corporateInfo.BondName)
                .Set(it => it.RegCapital, corporateInfo.RegCapital)
                .Set(it => it.LegalPersonName, corporateInfo.LegalPersonName)
                .Set(it => it.PercentileScore, corporateInfo.PercentileScore)
                .Set(it => it.EstiblishTime, corporateInfo.EstiblishTime)
                .Set(it => it.RegLocation, corporateInfo.RegLocation)
                .Set(it => it.IsMicroEnt, corporateInfo.IsMicroEnt)
                .Set(it => it.UsedBondName, corporateInfo.UsedBondName)
                .Set(it => it.RegNumber, corporateInfo.RegNumber)
                .Set(it => it.RegInstitute, corporateInfo.RegInstitute)
                .Set(it => it.Industry, corporateInfo.Industry)
                .Set(it => it.ApprovedTime, corporateInfo.ApprovedTime)
                .Set(it => it.SocialStaffNum, corporateInfo.SocialStaffNum)
                .Set(it => it.Tags, corporateInfo.Tags)
                .Set(it => it.TaxNumber, corporateInfo.TaxNumber)
                .Set(it => it.BusinessScope, corporateInfo.BusinessScope)
                .Set(it => it.Property3, corporateInfo.Property3)
                .Set(it => it.Alias, corporateInfo.Alias)
                .Set(it => it.OrgNumber, corporateInfo.OrgNumber)
                .Set(it => it.RegStatus, corporateInfo.RegStatus)
                .Set(it => it.UpdateTimes, corporateInfo.UpdateTimes)
                .Set(it => it.BondType, corporateInfo.BondType)
                .Set(it => it.ToTime, corporateInfo.ToTime)
                .Set(it => it.ActualCapital, corporateInfo.ActualCapital)
                .Set(it => it.CompanyOrgType, corporateInfo.CompanyOrgType)
                .Set(it => it.Email, corporateInfo.Email)
                .Set(it => it.WebsiteList, corporateInfo.WebsiteList)
                .Set(it => it.PhoneNumber, corporateInfo.PhoneNumber)
                .Set(it => it.Base, corporateInfo.Base)
                .Set(it => it.RegCapitalCurrency, corporateInfo.RegCapitalCurrency)
                .Set(it => it.HistoryNames, corporateInfo.HistoryNames)
                .Set(it => it.HistoryNameList, corporateInfo.HistoryNameList)
                .Set(it => it.BondNum, corporateInfo.BondNum)
                .Set(it => it.ActualCapitalCurrency, corporateInfo.ActualCapitalCurrency)
                .Set(it => it.RevokeDate, corporateInfo.RevokeDate)
                .Set(it => it.RevokeReason, corporateInfo.RevokeReason)
                .Set(it => it.CancelDate, corporateInfo.CancelDate)
                .Set(it => it.CancelReason, corporateInfo.CancelReason)
                .Set(it => it.City, corporateInfo.City)
                .Set(it => it.District, corporateInfo.District)
                .Set(it => it.Category, corporateInfo.Category)
                .Set(it => it.CategoryBig, corporateInfo.CategoryBig)
                .Set(it => it.CategoryMiddle, corporateInfo.CategoryMiddle)
                .Set(it => it.CategorySmall, corporateInfo.CategorySmall)
                .Set(it => it.LastModificationTime, corporateInfo.LastModificationTime)
                .Set(it => it.LastModifierId, corporateInfo.LastModifierId)

                .SetOnInsert(it => it.ExternalSourceId, corporateInfo.ExternalSourceId)
                .SetOnInsert(it => it.CreditCode, corporateInfo.CreditCode)
                .SetOnInsert(it => it.CreationTime, corporateInfo.CreationTime)
                .SetOnInsert(it => it.CreatorId, corporateInfo.CreatorId)
                .SetOnInsert(it => it.Id, corporateInfo.Id);
            await (await GetCollectionAsync()).UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true });
            return corporateInfo;
        }

        public async Task<List<CorporateInfo>> GetListAsync(string? filter, int skipCount = 0, int maxResult = int.MaxValue)
        {
            var queryable = await GetQueryableAsync();
            IQueryable<CorporateInfo> result = queryable
                            .WhereIf<CorporateInfo, IQueryable<CorporateInfo>>(filter != default, it => it.Name.Contains(filter!) || it.CreditCode.Contains(filter!))
                            .Select(it => new CorporateInfo(it.Id, it.Name, it.CreditCode, it.RegCapital, it.LegalPersonName, it.PercentileScore, it.EstiblishTime, it.RegLocation)).Skip(skipCount).Take(maxResult);

            return await result.ToListAsync();
        }

        public async Task<int> CountAsync(string? filter)
        {
            return await (await GetQueryableAsync())
                .WhereIf<CorporateInfo, IQueryable<CorporateInfo>>(filter != default, it => it.Name.Contains(filter!) || it.CreditCode.Contains(filter!))
                .CountAsync();
        }
    }
}
