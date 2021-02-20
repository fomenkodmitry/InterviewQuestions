using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DBMigrations.Migrations
{
    public partial class TagsData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Tags",
                new string[] {"Id", "IsActive", "DateCreated", "IsDelete", "Name", "DateUpdated"},
                new object[] {Guid.NewGuid(), true, DateTime.UtcNow, false, "C#", DateTime.UtcNow});
            migrationBuilder.InsertData("Tags",
                new string[] {"Id", "IsActive", "DateCreated", "IsDelete", "Name", "DateUpdated"},
                new object[] {Guid.NewGuid(), true, DateTime.UtcNow, false, "SQL", DateTime.UtcNow});
            migrationBuilder.InsertData("Tags",
                new string[] {"Id", "IsActive", "DateCreated", "IsDelete", "Name", "DateUpdated"},
                new object[] {Guid.NewGuid(), true, DateTime.UtcNow, false, "Postgres", DateTime.UtcNow});
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}