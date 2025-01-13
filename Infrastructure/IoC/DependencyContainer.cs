using Application.Interaces;
using Application.Services;
using Domain.Interfaces;
using Infrastructure.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.IoC
{
    public class DependencyContainer
    {
        public static void RegisterSevices(IServiceCollection services, string connection)
        {
            // Add DbContext
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connection));
            //Service
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<ICursoService, CursoService>();
            services.AddScoped<IMatriculaService,MatriculaService>();
            //Repository
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<ICursoRepository, CursoRepository>();
            services.AddScoped<IMatriculaRepository, MatriculaRepository>();

        }
    }
}
