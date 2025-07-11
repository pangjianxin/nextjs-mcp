using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wallee.Mcp.Migrations
{
    /// <inheritdoc />
    public partial class ModCorporateReportByIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_AppCorporateReports_CompanyName_CompanyUniscId",
                table: "AppCorporateReports");

            migrationBuilder.CreateIndex(
                name: "IX_AppCorporateReports_CompanyName_CompanyUniscId",
                table: "AppCorporateReports",
                columns: new[] { "CompanyName", "CompanyUniscId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppCorporateReports_CompanyName_CompanyUniscId",
                table: "AppCorporateReports");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_AppCorporateReports_CompanyName_CompanyUniscId",
                table: "AppCorporateReports",
                columns: new[] { "CompanyName", "CompanyUniscId" });
        }
    }
}
