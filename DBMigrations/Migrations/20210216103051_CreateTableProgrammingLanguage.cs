using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DBMigrations.Migrations
{
    public partial class CreateTableProgrammingLanguage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgrammingLanguage",
                table: "QuestionAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "Question",
                table: "QuestionAnswers",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProgrammingLanguageId",
                table: "QuestionAnswers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "ProgrammingLanguages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDelete = table.Column<bool>(type: "boolean", nullable: false),
                    DateDelete = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DateUpdated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgrammingLanguages", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionAnswers_ProgrammingLanguageId",
                table: "QuestionAnswers",
                column: "ProgrammingLanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionAnswers_ProgrammingLanguages_ProgrammingLanguageId",
                table: "QuestionAnswers",
                column: "ProgrammingLanguageId",
                principalTable: "ProgrammingLanguages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionAnswers_ProgrammingLanguages_ProgrammingLanguageId",
                table: "QuestionAnswers");

            migrationBuilder.DropTable(
                name: "ProgrammingLanguages");

            migrationBuilder.DropIndex(
                name: "IX_QuestionAnswers_ProgrammingLanguageId",
                table: "QuestionAnswers");

            migrationBuilder.DropColumn(
                name: "ProgrammingLanguageId",
                table: "QuestionAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "Question",
                table: "QuestionAnswers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProgrammingLanguage",
                table: "QuestionAnswers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
