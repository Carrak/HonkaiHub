using HonkaiCalc.Model;
using HonkaiCalc.Services;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<CalculatorService>();
builder.Services.AddSingleton<BirthdaysService>();

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "cors", builder =>
    {
        builder.WithOrigins("https://honkaihub.com", "https://www.honkaihub.com").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Configuration.AddJsonFile("birthdays.json", false, true);
builder.Configuration.AddJsonFile("constants.json", false, true);

builder.Services.Configure<CalculatorOptions>(builder.Configuration.GetSection("CalcOptions"));
builder.Services.Configure<CharacterBirthdaysOptions>(builder.Configuration.GetSection("BirthdaysOptions"));

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseCors("cors");

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Services.GetService<CalculatorService>();

app.Run();
