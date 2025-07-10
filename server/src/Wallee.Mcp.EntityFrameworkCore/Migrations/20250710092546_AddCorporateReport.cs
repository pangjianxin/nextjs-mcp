using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wallee.Mcp.Migrations
{
    /// <inheritdoc />
    public partial class AddCorporateReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppCorporateReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BlobId = table.Column<Guid>(type: "uuid", nullable: true),
                    DocumentName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    DownloadCount = table.Column<int>(type: "integer", nullable: false),
                    MediaType = table.Column<string>(type: "text", nullable: true),
                    ContentLength = table.Column<long>(type: "bigint", nullable: false),
                    DocumentGenerated = table.Column<bool>(type: "boolean", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CompanyUniscId = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    CompanyName = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true),
                    TransmissionHistories = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCorporateReports", x => x.Id);
                    table.UniqueConstraint("AK_AppCorporateReports_CompanyName_CompanyUniscId", x => new { x.CompanyName, x.CompanyUniscId });
                },
                comment: "企业报告信息");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppCorporateReports");
        }
    }
}
