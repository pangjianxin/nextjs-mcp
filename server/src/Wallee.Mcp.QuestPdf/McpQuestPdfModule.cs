using QuestPDF.Drawing;
using QuestPDF.Infrastructure;
using System.Reflection;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Wallee.Mcp.QuestPdf
{
    [DependsOn(typeof(McpDomainModule), typeof(AbpVirtualFileSystemModule))]
    public class McpQuestPdfModule : AbpModule
    {
        public override void PostConfigureServices(ServiceConfigurationContext context)
        {
            QuestPDF.Settings.License = LicenseType.Community;
            QuestPDF.Settings.CheckIfAllTextGlyphsAreAvailable = false;
            Assembly assembly = Assembly.GetExecutingAssembly();
            using var fileInfo = assembly.GetManifestResourceStream("Wallee.Openai.fonts.simhei.ttf");
            FontManager.RegisterFontWithCustomName("myFont", fileInfo!);
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<McpQuestPdfModule>();
            });
        }
    }
}
