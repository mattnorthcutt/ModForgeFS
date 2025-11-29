using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModForgeFS.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeededDataForUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserProfileId",
                table: "Builds",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e149b37d-2994-4144-ad4e-b5356cae99dd", "AQAAAAIAAYagAAAAEOJb69mdDRM52tjz+C2mTIdNhm1Kr/D2VXafVfvubb1XGuCe8J6Kktwfr1CtV+RXNg==", "aeb8de23-5d72-4d67-93b2-99f60b743e3d" });

            migrationBuilder.UpdateData(
                table: "Builds",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserProfileId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Builds",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserProfileId",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Builds_UserProfileId",
                table: "Builds",
                column: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Builds_UserProfiles_UserProfileId",
                table: "Builds",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Builds_UserProfiles_UserProfileId",
                table: "Builds");

            migrationBuilder.DropIndex(
                name: "IX_Builds_UserProfileId",
                table: "Builds");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "Builds");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7e5aaf76-7ce5-454c-8da8-ba76871d91fc", "AQAAAAIAAYagAAAAEFsibfqXpmRNGZOL91Bs94ifPm2LGbBtd7BhQ48NMS47EgY1QC1q2dZrakTyKONPrw==", "dfc94bf6-5291-4b52-9e08-6775c1089ca8" });
        }
    }
}
