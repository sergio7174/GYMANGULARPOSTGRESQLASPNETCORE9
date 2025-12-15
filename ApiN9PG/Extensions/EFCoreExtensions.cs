using ApiN9PG.Models;
using Microsoft.EntityFrameworkCore;
using ApiN9PG.Data;

namespace Api.Extensions
{
    public static class EFCoreExtensions
    {
        public static IServiceCollection InjectDbContext(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(options =>
                     options.UseNpgsql(config.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
