using AssetManagement.Business.Interface;
using AssetManagement.Business.Services;
using AssetManagement.Business.Validators;
using AssetManagement.Business.Validators.EmployeeCheck;
using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Data.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters
            .Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AssetmanagementConnectionString")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddScoped<IEmployeeService, EmployeeService>();

builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IAssetService, AssetService>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IAssetAssignmentRepository,AssetAssignmentRepository>();
builder.Services.AddScoped<IAssetAssignmentService, AssetAssignmentService>();

builder.Services.AddScoped<IAssetDocumentRepository, AssetDocumentRepository>();
builder.Services.AddScoped<IAssetDocumentService, AssetDocumentService>();

builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<ITicketService, TicketService>();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateEmployeeValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateAssetValidator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();

app.Run();
