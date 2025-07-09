using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using System.Collections.Generic;
using Wallee.Mcp.CorporateInfos;

namespace Wallee.Mcp.Documents.Extensions
{
    public static class ColumnDescriptorExtensions
    {
        public static void ComposeBaseInfo(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, CorporateInfo corporateInfo)
        {
            col.Item().Text(title).Style(titleStyle);

            col.Item().Border(1).Table(table =>
            {
                table.ColumnsDefinition(col =>
                {
                    col.RelativeColumn(3);
                    col.RelativeColumn(8);
                });
                //列名
                table.Cell().Row(1).Column(1).Element(BlockHeader).Text("企业名称").Style(tHeaderStyle);
                table.Cell().Row(2).Column(1).Element(BlockHeader).Text("社会信用代码证号").Style(tHeaderStyle);
                table.Cell().Row(3).Column(1).Element(BlockHeader).Text("注册资本").Style(tHeaderStyle);
                table.Cell().Row(4).Column(1).Element(BlockHeader).Text("成立日期").Style(tHeaderStyle);
                table.Cell().Row(5).Column(1).Element(BlockHeader).Text("经营状态").Style(tHeaderStyle);
                table.Cell().Row(6).Column(1).Element(BlockHeader).Text("工商注册号").Style(tHeaderStyle);
                table.Cell().Row(7).Column(1).Element(BlockHeader).Text("组织机构代码").Style(tHeaderStyle);
                table.Cell().Row(8).Column(1).Element(BlockHeader).Text("纳税人识别码").Style(tHeaderStyle);
                table.Cell().Row(9).Column(1).Element(BlockHeader).Text("企业类型").Style(tHeaderStyle);
                table.Cell().Row(10).Column(1).Element(BlockHeader).Text("所属行业").Style(tHeaderStyle);
                table.Cell().Row(11).Column(1).Element(BlockHeader).Text("注册地址").Style(tHeaderStyle);
                table.Cell().Row(12).Column(1).Element(BlockHeader).Text("登记机关").Style(tHeaderStyle);
                table.Cell().Row(13).Column(1).Element(BlockHeader).Text("经营期限").Style(tHeaderStyle);
                table.Cell().Row(14).Column(1).Element(BlockHeader).Text("官网").Style(tHeaderStyle);
                table.Cell().Row(15).Column(1).Element(BlockHeader).Text("邮箱").Style(tHeaderStyle);
                table.Cell().Row(16).Column(1).Element(BlockHeader).Text("经营范围").Style(tHeaderStyle);

                //列值
                table.Cell().Row(1).Column(2).Element(BlockContent).Text(corporateInfo.Name).Style(tColStyle);
                table.Cell().Row(2).Column(2).Element(BlockContent).Text(corporateInfo.CreditCode).Style(tColStyle);
                table.Cell().Row(3).Column(2).Element(BlockContent).Text(corporateInfo.RegCapital ?? "暂无").Style(tColStyle);
                table.Cell().Row(4).Column(2).Element(BlockContent).Text(corporateInfo.EstiblishTime.HasValue ? corporateInfo.EstiblishTime.Value.ToString("yyyy-MM-dd") : "暂无").Style(tColStyle);
                table.Cell().Row(5).Column(2).Element(BlockContent).Text(corporateInfo.RegStatus ?? "暂无").Style(tColStyle);
                table.Cell().Row(6).Column(2).Element(BlockContent).Text(corporateInfo.RegNumber ?? "暂无").Style(tColStyle);
                table.Cell().Row(7).Column(2).Element(BlockContent).Text(corporateInfo.OrgNumber ?? "暂无").Style(tColStyle);
                table.Cell().Row(8).Column(2).Element(BlockContent).Text(corporateInfo.TaxNumber ?? "暂无").Style(tColStyle);
                table.Cell().Row(9).Column(2).Element(BlockContent).Text(corporateInfo.CompanyOrgType ?? "暂无").Style(tColStyle);
                table.Cell().Row(10).Column(2).Element(BlockContent).Text(corporateInfo.Industry ?? "暂无").Style(tColStyle);
                table.Cell().Row(11).Column(2).Element(BlockContent).Text(corporateInfo.RegLocation).Style(tColStyle);
                table.Cell().Row(12).Column(2).Element(BlockContent).Text(corporateInfo.RegInstitute).Style(tColStyle);
                table.Cell().Row(13).Column(2).Element(BlockContent).Text($"{(corporateInfo.FromTime.HasValue ? corporateInfo.FromTime.Value.ToString("yyyy-MM-dd") : "暂无")}至{(corporateInfo.ToTime.HasValue ? corporateInfo.ToTime.Value.ToString("yyyy-MM-dd") : "暂无")}").Style(tColStyle);
                table.Cell().Row(14).Column(2).Element(BlockContent).Text(corporateInfo.WebsiteList ?? "暂无").Style(tColStyle);
                table.Cell().Row(15).Column(2).Element(BlockContent).Text(corporateInfo.EmailList?.JoinAsString(",") ?? "暂无").Style(tColStyle);
                table.Cell().Row(16).Column(2).Element(BlockContent).Text(corporateInfo.BusinessScope).Style(tColStyle);

            });
        }
        //public static void ComposeStaffs(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<Staff>? staffs)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(3);
        //            col.RelativeColumn(8);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("名称").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("职位").Style(tHeaderStyle);
        //        uint rowIndex = 1;
        //        if (staffs != null && staffs.Count > 0)
        //        {
        //            foreach (var staff in staffs)
        //            {
        //                uint colIndex = 0;
        //                ++rowIndex;
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(staff.Name).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(staff.TypeJoin != default ? staff.TypeJoin.JoinAsString(",") : "暂无").Style(tColStyle);
        //            }
        //        }
        //    });
        //}

        //public static void ComposeChangeInfos(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<ChangeInfo>? changeInfos)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(3);
        //            col.RelativeColumn(3);
        //            col.RelativeColumn(3);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("变更时间").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("变更事项").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(4).Element(BlockHeader).Text("变更前").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(5).Element(BlockHeader).Text("变更后").Style(tHeaderStyle);

        //        if (changeInfos != null && changeInfos.Count > 0)
        //        {
        //            uint rowIndex = 1;
        //            foreach (var changeInfo in changeInfos)
        //            {
        //                uint colIndex = 0;
        //                ++rowIndex;
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.ChangeTime.HasValue ? changeInfo.ChangeTime.Value.ToString("yyyy-MM-dd") : "暂无").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.ChangeItem).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.ContentBefore).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.ContentAfter).Style(tColStyle);
        //            }
        //        }
        //    });
        //}

        //public static void ComposeAdministrativeLicense(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<AdministrativeLicense>? administrativeLicenses)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(4);
        //            col.RelativeColumn(5);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("许可文件编号/文书号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("决定许可机关").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(4).Element(BlockHeader).Text("许可内容").Style(tHeaderStyle);

        //        if (administrativeLicenses != null && administrativeLicenses.Count > 0)
        //        {
        //            uint rowIndex = 1;
        //            foreach (var changeInfo in administrativeLicenses)
        //            {
        //                uint colIndex = 0;
        //                ++rowIndex;
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.LicenseNumber).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.LicenceDepartment).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.LicenceContent).Style(tColStyle);
        //            }
        //        }
        //    });
        //}

        //public static void ComposeShareholder(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<Shareholder>? shareholders)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(4);
        //            col.RelativeColumn(5);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("股东名称").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("认缴金额").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(4).Element(BlockHeader).Text("占比").Style(tHeaderStyle);

        //        if (shareholders != null && shareholders.Count > 0)
        //        {
        //            uint rowIndex = 1;

        //            foreach (var changeInfo in shareholders)
        //            {
        //                uint colIndex = 0;

        //                foreach (var capitalItem in changeInfo.Capital)
        //                {
        //                    ++rowIndex;
        //                    table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                    table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(changeInfo.Name).Style(tColStyle);
        //                    table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(capitalItem.Amomon).Style(tColStyle);
        //                    table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(capitalItem.Percent).Style(tColStyle);

        //                }
        //            }
        //        }
        //    });
        //}

        //public static void ComposeInvestments(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<Investment>? investments)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(5);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(2);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("企业名称").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("企业注册资本").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(4).Element(BlockHeader).Text("投资总额").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(5).Element(BlockHeader).Text("投资占比").Style(tHeaderStyle);

        //        if (investments != null && investments.Count > 0)
        //        {
        //            uint rowIndex = 1;
        //            foreach (var investment in investments)
        //            {
        //                uint colIndex = 0;

        //                ++rowIndex;

        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.Name).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.RegCapital).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{investment.Amount}{investment.AmountSuffix}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.Percent).Style(tColStyle);
        //            }
        //        }
        //    });
        //}
        //public static void ComposeBranches(this ColumnDescriptor col, string title, TextStyle titleStyle, TextStyle tHeaderStyle, TextStyle tColStyle, List<Branch>? branches)
        //{
        //    col.Item().Text(title).Style(titleStyle);

        //    col.Item().Border(1).Table(table =>
        //    {
        //        table.ColumnsDefinition(col =>
        //        {
        //            col.RelativeColumn(1);
        //            col.RelativeColumn(5);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(2);
        //            col.RelativeColumn(2);
        //        });
        //        //列名
        //        table.Cell().Row(1).Column(1).Element(BlockHeader).Text("序号").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(2).Element(BlockHeader).Text("企业名称").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(3).Element(BlockHeader).Text("法定代表人").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(4).Element(BlockHeader).Text("注册资本").Style(tHeaderStyle);
        //        table.Cell().Row(1).Column(5).Element(BlockHeader).Text("经营状态").Style(tHeaderStyle);

        //        if (branches != null && branches.Count > 0)
        //        {
        //            uint rowIndex = 1;
        //            foreach (var investment in branches)
        //            {
        //                uint colIndex = 0;

        //                ++rowIndex;

        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{rowIndex - 1}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.Name).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.LegalPersonName).Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text($"{investment.RegCapital}").Style(tColStyle);
        //                table.Cell().Row(rowIndex).Column(++colIndex).Element(BlockContent).Text(investment.RegStatus).Style(tColStyle);
        //            }
        //        }
        //    });
        //}

        public static IContainer BlockHeader(IContainer container)
        {
            return container
                .Border(.5f)
                .ShowOnce()
                .Padding(5F)
                .AlignLeft()
                .AlignMiddle();
        }
        public static IContainer BlockContent(IContainer container)
        {
            return container
               .Border(.5f)
               .ShowOnce()
               .Padding(5F)
               .AlignLeft()
               .AlignMiddle();
        }
    }
}
