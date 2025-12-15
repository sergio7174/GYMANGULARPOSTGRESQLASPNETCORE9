/**The using System; directive is a standard C# practice to import the base System namespace, which contains fundamental classes like Console, DateTime, and others. You can use it as you would in any other C# project
**/
using System;
/**The
System.Collections.Generic namespace is a foundational part of the .NET ecosystem, providing strongly typed, high-performance collections like List<T>, Dictionary<TKey, TValue>, Queue<T>, and Stack<T>. It is used pervasively in all C# applications, including ASP.NET Core 9, for efficient data management and manipulation.**/
using System.Collections.Generic;
/**You can use LINQ in your ASP.NET Core 9 application code (e.g., in controllers, services, or data access layers) to filter, sort, and project data.
is a fundamental namespace in the .NET framework, providing Language Integrated Query capabilities. It is fully supported in ASP.NET Core 9 and is automatically included in most modern project templates, often via implicit usings. you typically don't need to manually add using System.Linq; to the top of every code file. This is due to the ImplicitUsings feature, which is enabled by default in the project file (.csproj) for new projects targeting .NET 6 or later (including .NET 9). **/
using System.Linq;
/**System.Threading.Tasks
is fundamental to modern asynchronous programming in ASP.NET Core 9, primarily through the use of the async and await keywords.*/
using System.Threading.Tasks;
using ApiN9PG.Models;
using ApiN9PG.Models.users;
using ApiN9PG.Models.package;
using ApiN9PG.Models.trainer;
using ApiN9PG.Models.classe;
using ApiN9PG.Models.member;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace ApiN9PG.Data  /**Comes from Api/Data project folders path***/

{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { 
        }
        public DbSet<User> Users {get;set;}
        public DbSet<Pack> Packs {get;set;}
        public DbSet<Trainer> Trainers {get;set;}
        public DbSet<Classe> Classes {get;set;}
        public DbSet<Member> Members {get;set;}
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Explicitly set the table name to match PostgreSQL expectations
             modelBuilder.Entity<RefreshToken>()
            .ToTable("RefreshTokens"); // or "refresh_tokens" if using snake_case
            
        }

    }
}