using TodoApp.Data;
using TodoAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClientPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();
builder.AddSqlServerDbContext<TodoDbContext>("TodoDb");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Use CORS before routing
app.UseCors("ReactClientPolicy");

// Map Todo endpoints
app.MapTodoEndpoints();

app.Run();

