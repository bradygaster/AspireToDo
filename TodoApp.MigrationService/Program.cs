using TodoApp.Data;
using TodoApp.MigrationService;

var builder = Host.CreateApplicationBuilder(args);
builder.AddSqlServerDbContext<TodoDbContext>("TodoDb");

// Register worker service
builder.Services.AddHostedService<Worker>();

// Add Aspire service defaults
builder.AddServiceDefaults();

var host = builder.Build();
host.Run();
