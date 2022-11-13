using HonkaiCalc.Model;
using HonkaiCalc.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<CalculatorService>();
builder.Services.AddSingleton<BirthdaysService>();

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "cors", builder =>
    {
        //for when you're running on localhost
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        .AllowAnyHeader().AllowAnyMethod();


        //builder.WithOrigins("url from where you're trying to do the requests")
    });
});

builder.Configuration.AddJsonFile("birthdays.json", false, true);
builder.Configuration.AddJsonFile("constants.json", false, true);

builder.Services.Configure<CalculatorOptions>(builder.Configuration.GetSection("CalcOptions"));
builder.Services.Configure<CharacterBirthdaysOptions>(builder.Configuration.GetSection("BirthdaysOptions"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("cors");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Services.GetService<CalculatorService>();

app.Run();
