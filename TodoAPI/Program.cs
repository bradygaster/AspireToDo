using TodoApp.Data;
using TodoAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.AddSqlServerDbContext<TodoDbContext>("TodoDb");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Map Todo endpoints
app.MapTodoEndpoints();

app.Run();

