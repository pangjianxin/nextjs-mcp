using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Volo.Abp.VirtualFileSystem;
using Wallee.Mcp.CorporateInfos;
using Wallee.Mcp.Documents.Extensions;

namespace Wallee.Mcp.Documents
{
    public class CorporateInfoDocument : IDocument
    {
        private readonly string _docNum;
        private readonly IVirtualFileProvider _virtualFileProvider;
        private readonly CorporateInfo _model;
        private readonly float _margin = 15;
        public CorporateInfoDocument(string docNum, IVirtualFileProvider virtualFileProvider, CorporateInfo model)
        {
            _docNum = docNum;
            _virtualFileProvider = virtualFileProvider;
            _model = model;
        }
        public void Compose(IDocumentContainer container)
        {
            //封面
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(0);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(it => it.FontSize(9).FontFamily("myFont"));
                page.Content().Element(ComposeCover);
            });
            //说明
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(_margin);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(it => it.FontSize(9).FontFamily("myFont"));
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeAbstraction);
            });
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(_margin);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(it => it.FontSize(9).FontFamily("myFont"));
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeCatalog);
            });
            //正文
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(_margin);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(it => it.FontSize(9).FontFamily("myFont"));
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().Element(ComposeFooter);
                //page.Background().Element(ComposeForeground);
            });
        }

        public DocumentMetadata GetMetadata()
        {
            return DocumentMetadata.Default;
        }

        public DocumentSettings GetSettings()
        {
            return new DocumentSettings
            {
                ImageCompressionQuality = ImageCompressionQuality.Medium
            };
        }

        private void ComposeHeader(IContainer container)
        {
            using var stream = _virtualFileProvider.GetFileInfo("/Wallee/Openai/images/logo.png").CreateReadStream();

            var titleStyle = TextStyle.Default.FontSize(12).SemiBold().FontColor("bcbcbc");

            container.Row(row =>
            {
                row.RelativeItem().Column(column =>
                {
                    column.Item().Height(50).Image(stream).FitArea();
                });

                row.ConstantItem(300).Height(50).AlignMiddle().AlignRight().Text(_docNum).Style(titleStyle);
            });
        }

        private void ComposeAbstraction(IContainer container)
        {
            var lingStyle = TextStyle.Default.FontSize(16F).Bold();
            var titleStyle = TextStyle.Default.FontSize(21F).ExtraBold();
            container.Column(col =>
            {
                col.Item().Text(txt =>
                {
                    txt.AlignCenter();
                    txt.Line("报告说明").Style(titleStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line($"1、本报告采取的数据来自天眼查平台(https://www.tianyancha.com/),采集日期为{_model.CreationTime}").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("2、数据信息的采集、整理、汇总、加工、整合以及保存的全过程中保持客观、中立的视角。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("3、本报告依据合理的技术规范和信用模型做出的独立判断，用数据说话，未因受信息主体和其他任何组织机构或个人的影响而发生改变。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("4、本报告仅限用于中行包头分行内部的贷前审查、贷后调查等业务，不得以任何理由泄露给任何第三方。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("5、本报告未经授权，任何机构和个人不得进行复制及篡改等。").Style(lingStyle);
                });
            });
        }

        private void ComposeCatalog(IContainer container)
        {
            var lingStyle = TextStyle.Default.FontSize(16F).Bold().FontColor("0499fd");
            var titleStyle = TextStyle.Default.FontSize(21F).ExtraBold();
            container.Column(col =>
            {
                col.Item().Text(txt =>
                {
                    txt.AlignCenter();
                    txt.Line("报告构成").Style(titleStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("1、企业工商基础信息，包含企业的基础工商信息，如成立日期、注册资本、经营范围等。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("2、分支机构信息，包含企业的子公司等信息。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("3、变更信息，包含企业的变更记录。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("4、对外投资信息，包含企业的投资信息。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("5、股东信息，企业的股东结构信息。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("6、主要成员信息，企业的管理层信息。").Style(lingStyle);
                });

                col.Item().Text(txt =>
                {
                    txt.Line("7、行政许可信息，企业的经营资质信息。").Style(lingStyle);
                });
            });
        }

        private void ComposeCover(IContainer container)
        {
            using var topLeftPng = _virtualFileProvider.GetFileInfo("/Wallee/Openai/images/top-left.jpg").CreateReadStream();
            using var bottomRightPng = _virtualFileProvider.GetFileInfo("/Wallee/Openai/images/bottom-right.jpg").CreateReadStream();

            container.Column(col =>
            {
                col.Item().ShowOnce().Column(col =>
                {
                    col.Item().AlignTop().AlignLeft().Height(150).Image(topLeftPng!).FitHeight();
                    col.Item().Height(520).AlignMiddle().Text(text =>
                    {
                        text.AlignCenter();
                        text.Line("ENTERPRISE").LetterSpacing(.1F).FontColor("9d1f23").FontSize(48F).ExtraBold();
                        text.Line("CREDIT_EVELUATION_REPORT").LineHeight(1.5F).LetterSpacing(.1F).FontColor("9d1f23").FontSize(20F);
                        text.Line("企业工商基础信息").LetterSpacing(.1F).FontSize(34F).LineHeight(1.5F).ExtraBold();
                    });
                    col.Item().AlignBottom().AlignRight().Height(150).Image(bottomRightPng!).FitHeight();
                });


            });
        }
        private void ComposeContent(IContainer container)
        {
            var tHeaderStyle = TextStyle.Default.FontColor("0499fd").FontSize(14F).Bold();
            var tColStyle = TextStyle.Default.FontSize(12F);
            var titleStyle = TextStyle.Default.FontSize(16F).ExtraBold();

            container.Column(col =>
            {
                col.Spacing(10);

                col.ComposeBaseInfo("一、基础信息", titleStyle, tHeaderStyle, tColStyle, _model);

                //col.ComposeStaffs("二、主要成员", titleStyle, tHeaderStyle, tColStyle, _model.Staffs);

                //col.ComposeChangeInfos("三、变更记录", titleStyle, tHeaderStyle, tColStyle, _model.ChangeInfos);

                //col.ComposeAdministrativeLicense("四、行政许可", titleStyle, tHeaderStyle, tColStyle, _model.AdministrativeLicenses);

                //col.ComposeShareholder("五、股东信息", titleStyle, tHeaderStyle, tColStyle, _model.Shareholders);

                //col.ComposeInvestments("六、对外投资", titleStyle, tHeaderStyle, tColStyle, _model.Investments);

                //col.ComposeBranches("七、分支机构", titleStyle, tHeaderStyle, tColStyle, _model.Branches);
            });
        }
        private void ComposeFooter(IContainer container)
        {
            container.SkipOnce().PaddingTop(10).Column(col =>
            {
                col.Item().AlignCenter().Text(txt =>
                {
                    txt.Span("第");
                    txt.CurrentPageNumber();
                    txt.Span("页");
                });
            });
        }

        private void ComposeForeground(IContainer container)
        {
            using var waterMark = _virtualFileProvider.GetFileInfo("/Wallee/Openai/images/watermark.png").CreateReadStream();

            container.AlignCenter().AlignMiddle().Height(200).Width(200).Column(col =>
            {
                col.Item().Image(waterMark!).FitArea();
            });
        }
    }
}
