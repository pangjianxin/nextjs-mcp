using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wallee.Mcp.Migrations
{
    /// <inheritdoc />
    public partial class AddCorporateInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppCorporateInfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ExternalId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CreditCode = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    RegCapital = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    RegCapitalCurrency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ActualCapital = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ActualCapitalCurrency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    LegalPersonName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CompanyOrgType = table.Column<string>(type: "character varying(127)", maxLength: 127, nullable: true),
                    RegInstitute = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    RegNumber = table.Column<string>(type: "character varying(31)", maxLength: 31, nullable: true),
                    Base = table.Column<string>(type: "character varying(31)", maxLength: 31, nullable: true),
                    RegLocation = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    RegStatus = table.Column<string>(type: "character varying(31)", maxLength: 31, nullable: true),
                    BusinessScope = table.Column<string>(type: "character varying(4091)", maxLength: 4091, nullable: true),
                    Industry = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    PercentileScore = table.Column<int>(type: "integer", nullable: false),
                    ApprovedTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    EstiblishTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    FromTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    ToTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UpdateTimes = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CancelDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CancelReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    RevokeDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    RevokeReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsMicroEnt = table.Column<int>(type: "integer", nullable: false),
                    SocialStaffNum = table.Column<int>(type: "integer", nullable: true),
                    StaffNumRange = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Tags = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    TaxNumber = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    OrgNumber = table.Column<string>(type: "character varying(31)", maxLength: 31, nullable: true),
                    Alias = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Property3 = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    HistoryNames = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    HistoryNameList = table.Column<string[]>(type: "text[]", nullable: true),
                    EmailList = table.Column<string[]>(type: "text[]", nullable: true),
                    PhoneNumber = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    WebsiteList = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    District = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    DistrictCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    BondNum = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    BondName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    BondType = table.Column<string>(type: "character varying(31)", maxLength: 31, nullable: true),
                    UsedBondName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    BRNNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    EconomicFunctionZone1 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    EconomicFunctionZone2 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true),
                    IndustryAll = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCorporateInfos", x => x.Id);
                    table.UniqueConstraint("AK_AppCorporateInfos_Name_CreditCode", x => new { x.Name, x.CreditCode });
                },
                comment: "企业信息");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppCorporateInfos");
        }
    }
}
