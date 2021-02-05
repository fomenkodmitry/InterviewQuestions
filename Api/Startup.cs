using Api.Middleware;
using Api.Scheduler;
using Api.Utils.AutoMapper;
using Domain.Audit;
using Domain.Authenticate;
using Domain.FileStorage;
using Domain.Srbac;
using Domain.Token;
using Domain.User;
using Infrastructure;
using Infrastructure.AppSettings;
using Infrastructure.Contexts;
using Infrastructure.Crypto;
using Infrastructure.Email;
using Infrastructure.FileStorage;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Services.Implementations;
using System;
using System.IO;
using System.Text;
using System.Text.Json.Serialization;
using Autofac;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace Api
{
    public class Startup
    {
        private static readonly string Env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        private static readonly string AppSettings =
            string.IsNullOrEmpty(Env) ? "appsettings.json" : $"appsettings.{Env}.json";
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc(p => p.EnableEndpointRouting = false);

            var key = Encoding.ASCII.GetBytes(Configuration["AppSettings:Secret"]);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = false
                    };
                });

            var securityScheme = new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Name = "Authorization",
                BearerFormat = "Bearer {authToken}",
                Description = "JWT Token",
                Type = SecuritySchemeType.ApiKey
            };
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "API Template", Version = "v1"});

                c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "Api.xml"));
                c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "Domain.xml"));

                c.AddSecurityDefinition(
                    "Bearer", securityScheme
                );
                c.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme, Id = "Bearer"
                                }
                            },
                            new string[] { }
                        }
                    });
            });
         
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "../ClientApp/ClientApp/build"; });
            
            services
                .AddControllers()
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            var dbContextOptionsBuilder =
                new DbContextOptionsBuilder<Context>().UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection"));
            builder
                .RegisterType<Context>()
                .WithParameter("options", dbContextOptionsBuilder.Options)
                .InstancePerLifetimeScope();

            // Auto Mapper Configurations
            builder.RegisterAutoMapper(p => p.AddProfile(new MappingProfile()));

            #region DI Service

            builder
                .RegisterInstance(new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile(AppSettings, optional: true, reloadOnChange: false)
                    .Build()
                )
                .As<IConfigurationRoot>()
                .SingleInstance();

            builder.RegisterType<AuthenticationService>().As<IAuthenticationService>();
            builder.RegisterType<TokenService>().As<ITokenService>();
            builder.RegisterType<UserService>().As<IUserService>();

            builder.RegisterType<SrbacService>().As<ISrbacService>().SingleInstance();
            builder.RegisterType<CryptoHelper>().SingleInstance();
            builder.RegisterType<ScheduleTask>().As<IHostedService>().SingleInstance();
            builder
                .Register(p => Configuration
                    .GetSection(nameof(FileStorageConfiguration))
                    .Get<FileStorageConfiguration>()
                )
                .As<FileStorageConfiguration>()
                .SingleInstance();

            builder.RegisterType<FileStorageService>().As<IFileStorageService>();
            builder.RegisterType<AuditService>().As<IAuditService>();

            builder
                .RegisterInstance(Configuration
                    .GetSection(nameof(AppSettingsConfiguration))
                    .Get<AppSettingsConfiguration>()
                )
                .As<AppSettingsConfiguration>()
                .SingleInstance();

            #endregion

            #region DI Repository

            builder.RegisterType<GenericRepository>().As<IGenericRepository>();
            builder.RegisterType<SqlRepository>();
            #endregion
            
            #region DI Infrastructure
            
            builder
                .RegisterInstance(Configuration
                    .GetSection(nameof(EmailConfiguration))
                    .Get<EmailConfiguration>()
                )
                .As<EmailConfiguration>()
                .SingleInstance();
            
            builder.RegisterType<EmailSender>().As<IEmailSender>();

            builder.RegisterType<InitializeInfrastructure>();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            ILoggerFactory loggerFactory,
            InitializeInfrastructure infrastructure
        )
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "KPD v1"); });

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            
            app.UseMiddleware<TokenMiddleware>();
            
            app.UseMvc();
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../ClientApp/ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            
            UpdateDatabase(app);
            infrastructure.FileStorage();
            var logger = loggerFactory.CreateLogger("LoggerInStartup");
            logger.LogInformation($"\n\n{DateTime.Now} | Startup logger was launched");
        }

        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            
            using var context = serviceScope.ServiceProvider.GetService<Context>();
            context?.Database.Migrate();
        }
    }
}