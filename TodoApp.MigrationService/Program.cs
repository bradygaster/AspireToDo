using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.MigrationService;

var builder = Host.CreateApplicationBuilder(args);

// Add database context
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoDb")));

// Register worker service
builder.Services.AddHostedService<Worker>();

// Add Aspire service defaults
builder.AddServiceDefaults();

var host = builder.Build();
host.Run();
