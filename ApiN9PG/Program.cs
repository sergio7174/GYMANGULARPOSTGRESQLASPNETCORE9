

/*Entity Framework (EF) Core: The core library provided by Microsoft that enables .NET developers to work with a database using .NET objects, eliminating most data access code.*/
using Microsoft.EntityFrameworkCore;
/*Microsoft removed the default Swagger UI from .NET 9 project templates, making Scalar a popular alternative for API documentation**/
using Scalar.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Npgsql; // Might be needed for specific SSL callbacks
using Npgsql.EntityFrameworkCore.PostgreSQL; // Esta es la directiva que probablemente falta
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApiN9PG.Controllers;
using ApiN9PG.Extensions;
using ApiN9PG.Models;
using ApiN9PG.Models.users;
using ApiN9PG.Services;
using ApiN9PG.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
// Register TokenService
builder.Services.AddScoped<TokenService>();
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

/**builder.Services.AddControllers() adds MVC controllers to the dependency injection (DI) container, enabling the app to handle HTTP requests via controller actions.
.AddNewtonsoftJson() tells ASP.NET Core to use Newtonsoft.Json (instead of the default System.Text.Json) for:
Serializing C# objects to JSON responses.
Deserializing JSON requests into C# objects.**/
builder.Services.AddControllers().AddNewtonsoftJson();
/**Tells EF Core to use PostgreSQL as the database provider.
builder.Configuration.GetConnectionString("DefaultConnection")
Retrieves the connection string from the configuration using the key "DefaultConnection".
Adds the ApplicationDbContext class (a subclass of DbContext) to the dependency injection (DI) container so it can be injected into controllers, services, etc.**/
builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")
));
builder.Services.AddIdentity<User,IdentityRole>().AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


/***This line is part of the ASP.NET Core application startup process and is used to build the WebApplication instance that will handle HTTP requests. Here's a breakdown of its purpose:
Finalizes Configuration
The builder object (of type WebApplicationBuilder) is used to configure services, middleware, and application settings.
Calling builder.Build() finalizes this configuration and creates the WebApplication instance (app).
Creates the Application Pipeline
The app object represents the HTTP request pipeline. After building, you configure middleware (e.g., routing, authentication, Swagger) using methods like, / 1. Configure services (e.g., DI, logging, EF Core) builder.Services.AddControllers(); builder.Services.AddSwaggerGen();

// 2. Build the application var app = builder.Build();

// 3. Configure the HTTP request pipeline app.UseSwagger(); app.UseSwaggerUI(); app.UseRouting(); app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

// 4. Start the application app.Run();
**/
//enable jwt token
var _authkey = builder.Configuration.GetValue<string>("JwtSettings:securitykey");
builder.Services.AddAuthentication(item =>
{
    item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(item =>
{
    item.RequireHttpsMetadata = true;
    item.SaveToken = true;
    item.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authkey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

});


var app = builder.Build();

// to serve statics files
app.UseStaticFiles(); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
/***The app.UseHttpsRedirection() method in ASP.NET Core is a middleware that redirects HTTP requests to HTTPS to enforce secure communication. This is critical for ensuring data integrity and confidentiality, especially in production environments.Redirects HTTP to HTTPS
When an HTTP request is received (e.g., http://example.com), this middleware sends a 307 Temporary Redirect to the HTTPS version of the same URL (e.g., https://example.com).
Enforces Secure Communication
Prevents insecure HTTP traffic by ensuring all communication uses HTTPS (TLS/SSL encryption).
Development/Testing Use
Commonly used in development to simulate secure environments. In production, HTTPS is typically enforced by reverse proxies (e.g., IIS, Nginx, or cloud services like Azure/AWS).**/
app.UseHttpsRedirection();
/**The app.UseCors() method in ASP.NET Core is a middleware that enables Cross-Origin Resource Sharing (CORS) for your application. It allows your API to accept requests from different domains (origins) than the one it's hosted on, which is essential for modern web and mobile applications.**/
app.UseCors(options=>{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
}
);

/**The app.MapControllers(); line in an ASP.NET Core application is used to enable attribute-based routing for controllers. It tells the framework to scan all controllers in the application and map their routes based on the [Route], [HttpGet], [HttpPost], etc., attributes defined on the controller or its actions.Maps Controller Routes
It registers routes for all controllers that use attribute routing (e.g., [ApiController], [Route("api/[controller]")]).
Enables Attribute-Based Endpoints
Without this line, the framework will not recognize routes defined with attributes on controllers or actions.
Part of the Endpoint Routing Pipeline
It is typically placed after app.UseRouting() and before other middleware like app.UseAuthorization() or app.UseEndpoints() (in older ASP.NET Core versions).**/
app.MapControllers();
app.Run();