using System;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Timing;
using Volo.Abp.Uow;
using Wallee.Mcp.CorporateInfos.Records;

namespace Wallee.Mcp.CorporateInfos.Events
{
    public class CorporateInfoFetchedEventHandler : IDistributedEventHandler<CorporateInfoFetchedEvent>, ITransientDependency
    {
        private readonly ICorporateInfoRepository _repository;
        private readonly IObjectMapper _objectMapper;
        private readonly IClock _clock;

        public CorporateInfoFetchedEventHandler(
            ICorporateInfoRepository repository, IObjectMapper objectMapper, IClock clock)
        {
            _repository = repository;
            _objectMapper = objectMapper;
            _clock = clock;
        }

        [UnitOfWork]
        public async Task HandleEventAsync(CorporateInfoFetchedEvent eventData)
        {
            var record = eventData.Record;
            var exists = await _repository.FindAsync(it => it.CreditCode == record.CreditCode);

            if (exists == null)
            {
                var entity = _objectMapper.Map<CorporateInfoRecord, CorporateInfo>(record);
                entity = await _repository.InsertAsync(entity);
            }
            else
            {
                if (exists.LastModificationTime.HasValue && (_clock.Now - exists.LastModificationTime) > TimeSpan.FromDays(90))
                {
                    var industryAll = record.IndustryAll == null ? null : _objectMapper.Map<IndustryAllRecord, IndustryAllInfo>(record.IndustryAll);

                    exists.Update(record.RegCapital, record.RegCapitalCurrency, record.ActualCapital, record.ActualCapitalCurrency,
                        record.LegalPersonName, record.Type, record.CompanyOrgType, record.RegInstitute, record.RegNumber,
                        record.Base, record.RegLocation, record.RegStatus, record.BusinessScope, record.Industry, industryAll, record.PercentileScore, record.ApprovedTime, record.EstiblishTime, record.FromTime,
                        record.ToTime, record.UpdateTimes, record.CancelDate, record.CancelReason, record.RevokeDate, record.RevokeReason, record.IsMicroEnt, record.SocialStaffNum,
                        record.StaffNumRange, record.Tags, record.TaxNumber, record.OrgNumber, record.Alias, record.Property3, record.HistoryNames, record.HistoryNameList, record.EmailList, record.PhoneNumber,
                        record.WebsiteList, record.City, record.District, record.DistrictCode, record.BondNum, record.BondName, record.BondType, record.UsedBondName, record.BRNNumber, record.EconomicFunctionZone1, record.EconomicFunctionZone2
                    );

                    await _repository.UpdateAsync(exists);
                }
            }



        }
    }
}
