using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;

namespace MediaService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure data service
            services.Configure<Models.MediaDatabaseSettings>(
                Configuration.GetSection(nameof(Models.MediaDatabaseSettings)));

            services.AddSingleton<Models.IDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<Models.MediaDatabaseSettings>>().Value);

            services.AddSingleton<Services.MediaDataService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors();

            // Serve media files
            var mediaDataService = app.ApplicationServices?.GetService<Services.MediaDataService>();
            if (mediaDataService != null)
            {
                var relativePath = mediaDataService.MediaStoreRootPath;
                var fullPath = Path.GetFullPath(relativePath);
                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(fullPath),
                    RequestPath = new PathString("/media")
                });
            }


            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
