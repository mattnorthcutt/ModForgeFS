using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModForgeFS.Migrations
{
    /// <inheritdoc />
    public partial class FixedModPartNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "InstallDate",
                table: "ModParts",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "91067bf2-638d-46a1-b254-35b8e20d2da4", "AQAAAAIAAYagAAAAEDz4k04ZMekhcF7I6L42VlwAi356VXIhi3VBgHfzPoMMxZf8+Ym4vnd1LixQoskt/w==", "7342ab82-cc5c-4193-aa06-047493867145" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "InstallDate",
                table: "ModParts",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e149b37d-2994-4144-ad4e-b5356cae99dd", "AQAAAAIAAYagAAAAEOJb69mdDRM52tjz+C2mTIdNhm1Kr/D2VXafVfvubb1XGuCe8J6Kktwfr1CtV+RXNg==", "aeb8de23-5d72-4d67-93b2-99f60b743e3d" });
        }
    }
}
