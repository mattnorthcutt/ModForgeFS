using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModForgeFS.Migrations
{
    /// <inheritdoc />
    public partial class AddBuildIsPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Builds",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5740808b-998e-47c0-b309-fe908bf653ca", "AQAAAAIAAYagAAAAELScjmZZtWTFYCwDxkOJ7Jq9hhEfxuwvrNEJwQxzbk1krq9gJMoFYF9rMeM65fmL5A==", "b5bcdd4c-5ec3-4925-bd05-be5555495cba" });

            migrationBuilder.UpdateData(
                table: "Builds",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsPublic",
                value: false);

            migrationBuilder.UpdateData(
                table: "Builds",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsPublic",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Builds");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "91067bf2-638d-46a1-b254-35b8e20d2da4", "AQAAAAIAAYagAAAAEDz4k04ZMekhcF7I6L42VlwAi356VXIhi3VBgHfzPoMMxZf8+Ym4vnd1LixQoskt/w==", "7342ab82-cc5c-4193-aa06-047493867145" });
        }
    }
}
