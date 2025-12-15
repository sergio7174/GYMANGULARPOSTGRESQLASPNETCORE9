using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ApiN9PG.Migrations
{
    /// <inheritdoc />
    public partial class AddClasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Classname = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    Classday = table.Column<string>(type: "text", nullable: true),
                    Classtime = table.Column<string>(type: "text", nullable: true),
                    Classlevel = table.Column<string>(type: "text", nullable: true),
                    Trainer = table.Column<string>(type: "text", nullable: true),
                    Key_benefits = table.Column<string>(type: "text", nullable: true),
                    Expert_trainer = table.Column<string>(type: "text", nullable: true),
                    Class_overview = table.Column<string>(type: "text", nullable: true),
                    Why_matters = table.Column<string>(type: "text", nullable: true),
                    Image = table.Column<string>(type: "text", nullable: true),
                    DateBegin = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateEndClass = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Session_time = table.Column<decimal>(type: "numeric", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Classes");
        }
    }
}
