$(function () {

    function debounce(func, delay) {
        let timerId;
        return function(...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    $("#CorporateInfoFilter :input").on('input', debounce(function () {
        dataTable.ajax.reload();
    }, 300));

    //After abp v7.2 use dynamicForm 'column-size' instead of the following settings
    //$('#CorporateInfoCollapse div').addClass('col-sm-3').parent().addClass('row');

    var getFilter = function () {
        var input = {};
        $("#CorporateInfoFilter")
            .serializeArray()
            .forEach(function (data) {
                if (data.value != '') {
                    input[abp.utils.toCamelCase(data.name.replace(/CorporateInfoFilter./g, ''))] = data.value;
                }
            })
        return input;
    };

    var l = abp.localization.getResource('Mcp');

    var service = wallee.mcp.corporateInfos.corporateInfo;
    var createModal = new abp.ModalManager(abp.appPath + 'CorporateInfos/CorporateInfo/CreateModal');
    var editModal = new abp.ModalManager(abp.appPath + 'CorporateInfos/CorporateInfo/EditModal');

    var dataTable = $('#CorporateInfoTable').DataTable(abp.libs.datatables.normalizeConfiguration({
        processing: true,
        serverSide: true,
        paging: true,
        searching: false,//disable default searchbox
        autoWidth: false,
        scrollCollapse: true,
        order: [[0, "asc"]],
        ajax: abp.libs.datatables.createAjax(service.getList,getFilter),
        columnDefs: [
            {
                rowAction: {
                    items:
                        [
                            {
                                text: l('Edit'),
                                visible: abp.auth.isGranted('Mcp.CorporateInfo.Update'),
                                action: function (data) {
                                    editModal.open({ id: data.record.id });
                                }
                            },
                            {
                                text: l('Delete'),
                                visible: abp.auth.isGranted('Mcp.CorporateInfo.Delete'),
                                confirmMessage: function (data) {
                                    return l('CorporateInfoDeletionConfirmationMessage', data.record.id);
                                },
                                action: function (data) {
                                    service.delete(data.record.id)
                                        .then(function () {
                                            abp.notify.info(l('SuccessfullyDeleted'));
                                            dataTable.ajax.reload();
                                        });
                                }
                            }
                        ]
                }
            },
            {
                title: l('CorporateInfoExternalId'),
                data: "externalId"
            },
            {
                title: l('CorporateInfoName'),
                data: "name"
            },
            {
                title: l('CorporateInfoCreditCode'),
                data: "creditCode"
            },
            {
                title: l('CorporateInfoRegCapital'),
                data: "regCapital"
            },
            {
                title: l('CorporateInfoRegCapitalCurrency'),
                data: "regCapitalCurrency"
            },
            {
                title: l('CorporateInfoActualCapital'),
                data: "actualCapital"
            },
            {
                title: l('CorporateInfoActualCapitalCurrency'),
                data: "actualCapitalCurrency"
            },
            {
                title: l('CorporateInfoLegalPersonName'),
                data: "legalPersonName"
            },
            {
                title: l('CorporateInfoType'),
                data: "type"
            },
            {
                title: l('CorporateInfoCompanyOrgType'),
                data: "companyOrgType"
            },
            {
                title: l('CorporateInfoRegInstitute'),
                data: "regInstitute"
            },
            {
                title: l('CorporateInfoRegNumber'),
                data: "regNumber"
            },
            {
                title: l('CorporateInfoBase'),
                data: "base"
            },
            {
                title: l('CorporateInfoRegLocation'),
                data: "regLocation"
            },
            {
                title: l('CorporateInfoRegStatus'),
                data: "regStatus"
            },
            {
                title: l('CorporateInfoBusinessScope'),
                data: "businessScope"
            },
            {
                title: l('CorporateInfoIndustry'),
                data: "industry"
            },
            {
                title: l('CorporateInfoIndustryAll'),
                data: "industryAll"
            },
            {
                title: l('CorporateInfoPercentileScore'),
                data: "percentileScore"
            },
            {
                title: l('CorporateInfoApprovedTime'),
                data: "approvedTime"
            },
            {
                title: l('CorporateInfoEstiblishTime'),
                data: "estiblishTime"
            },
            {
                title: l('CorporateInfoFromTime'),
                data: "fromTime"
            },
            {
                title: l('CorporateInfoToTime'),
                data: "toTime"
            },
            {
                title: l('CorporateInfoUpdateTimes'),
                data: "updateTimes"
            },
            {
                title: l('CorporateInfoCancelDate'),
                data: "cancelDate"
            },
            {
                title: l('CorporateInfoCancelReason'),
                data: "cancelReason"
            },
            {
                title: l('CorporateInfoRevokeDate'),
                data: "revokeDate"
            },
            {
                title: l('CorporateInfoRevokeReason'),
                data: "revokeReason"
            },
            {
                title: l('CorporateInfoIsMicroEnt'),
                data: "isMicroEnt"
            },
            {
                title: l('CorporateInfoSocialStaffNum'),
                data: "socialStaffNum"
            },
            {
                title: l('CorporateInfoStaffNumRange'),
                data: "staffNumRange"
            },
            {
                title: l('CorporateInfoTags'),
                data: "tags"
            },
            {
                title: l('CorporateInfoTaxNumber'),
                data: "taxNumber"
            },
            {
                title: l('CorporateInfoOrgNumber'),
                data: "orgNumber"
            },
            {
                title: l('CorporateInfoAlias'),
                data: "alias"
            },
            {
                title: l('CorporateInfoProperty3'),
                data: "property3"
            },
            {
                title: l('CorporateInfoHistoryNames'),
                data: "historyNames"
            },
            {
                title: l('CorporateInfoPhoneNumber'),
                data: "phoneNumber"
            },
            {
                title: l('CorporateInfoWebsiteList'),
                data: "websiteList"
            },
            {
                title: l('CorporateInfoCity'),
                data: "city"
            },
            {
                title: l('CorporateInfoDistrict'),
                data: "district"
            },
            {
                title: l('CorporateInfoDistrictCode'),
                data: "districtCode"
            },
            {
                title: l('CorporateInfoBondNum'),
                data: "bondNum"
            },
            {
                title: l('CorporateInfoBondName'),
                data: "bondName"
            },
            {
                title: l('CorporateInfoBondType'),
                data: "bondType"
            },
            {
                title: l('CorporateInfoUsedBondName'),
                data: "usedBondName"
            },
            {
                title: l('CorporateInfoBRNNumber'),
                data: "bRNNumber"
            },
            {
                title: l('CorporateInfoEconomicFunctionZone1'),
                data: "economicFunctionZone1"
            },
            {
                title: l('CorporateInfoEconomicFunctionZone2'),
                data: "economicFunctionZone2"
            },
        ]
    }));

    createModal.onResult(function () {
        dataTable.ajax.reload();
    });

    editModal.onResult(function () {
        dataTable.ajax.reload();
    });

    $('#NewCorporateInfoButton').click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});
