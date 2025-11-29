using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ModForgeFS.Migrations
{
    /// <inheritdoc />
    public partial class SeededDataAndModelsAndDTOs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Builds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VehicleName = table.Column<string>(type: "text", nullable: false),
                    ImageLocation = table.Column<string>(type: "text", nullable: false),
                    Goal = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Budget = table.Column<decimal>(type: "numeric", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Builds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ModParts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BuildId = table.Column<int>(type: "integer", nullable: false),
                    Brand = table.Column<string>(type: "text", nullable: false),
                    ModName = table.Column<string>(type: "text", nullable: false),
                    ModType = table.Column<string>(type: "text", nullable: false),
                    Cost = table.Column<decimal>(type: "numeric", nullable: false),
                    InstallDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModParts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModParts_Builds_BuildId",
                        column: x => x.BuildId,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ModTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ModPartId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModTags_ModParts_ModPartId",
                        column: x => x.ModPartId,
                        principalTable: "ModParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ModTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7e5aaf76-7ce5-454c-8da8-ba76871d91fc", "AQAAAAIAAYagAAAAEFsibfqXpmRNGZOL91Bs94ifPm2LGbBtd7BhQ48NMS47EgY1QC1q2dZrakTyKONPrw==", "dfc94bf6-5291-4b52-9e08-6775c1089ca8" });

            migrationBuilder.InsertData(
                table: "Builds",
                columns: new[] { "Id", "Budget", "CreatedAt", "Goal", "ImageLocation", "Notes", "StartDate", "Status", "VehicleName" },
                values: new object[,]
                {
                    { 1, 5000m, new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Street performance", "https://placehold.co/600x400", "Intake, exhaust, tune first.", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "In Progress", "2014 Mustang GT" },
                    { 2, 3500m, new DateTime(2025, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Track ready", "https://placehold.co/600x400", "Suspension and braking upgrades.", new DateTime(2025, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Planned", "2006 Yamaha R6" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Performance" },
                    { 2, "Cosmetic" },
                    { 3, "Reliability" },
                    { 4, "Track" }
                });

            migrationBuilder.InsertData(
                table: "ModParts",
                columns: new[] { "Id", "Brand", "BuildId", "Cost", "CreatedAt", "InstallDate", "Link", "ModName", "ModType", "Notes" },
                values: new object[,]
                {
                    { 1, "K&N", 1, 379.99m, new DateTime(2025, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://example.com/intake", "Cold Air Intake", "Intake", "Better throttle response." },
                    { 2, "Borla", 1, 1299.00m, new DateTime(2025, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://example.com/exhaust", "Cat-back Exhaust", "Exhaust", "Deep tone, minimal drone." },
                    { 3, "Öhlins", 2, 999.00m, new DateTime(2025, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://example.com/shock", "Rear Shock", "Suspension", "Track baseline setup." }
                });

            migrationBuilder.InsertData(
                table: "ModTags",
                columns: new[] { "Id", "ModPartId", "TagId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 1 },
                    { 3, 3, 1 },
                    { 4, 3, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ModParts_BuildId",
                table: "ModParts",
                column: "BuildId");

            migrationBuilder.CreateIndex(
                name: "IX_ModTags_ModPartId",
                table: "ModTags",
                column: "ModPartId");

            migrationBuilder.CreateIndex(
                name: "IX_ModTags_TagId",
                table: "ModTags",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModTags");

            migrationBuilder.DropTable(
                name: "ModParts");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Builds");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "210f9a79-b4bd-4502-aaa8-726d01beeb56", "AQAAAAIAAYagAAAAEOI4j5f4JfLupXzfcxOt+lEMQgD6AH9ignbFOJnUNgP5OkUbre2kSOtfVDCaO/PlBg==", "5c6da366-b887-4f49-823d-1072c800137b" });
        }
    }
}
