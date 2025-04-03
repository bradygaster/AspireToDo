using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Data.Models;

namespace TodoAPI.Extensions;

public static class EndpointExtensions
{
    public static void MapTodoEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/todos").WithOpenApi();

        // Get all todos
        group.MapGet("/", async (TodoDbContext db) => 
            await db.Todos.ToListAsync());

        // Get todo by id
        group.MapGet("/{id}", async (int id, TodoDbContext db) =>
            await db.Todos.FindAsync(id) is Todo todo
                ? Results.Ok(todo)
                : Results.NotFound());

        // Create new todo
        group.MapPost("/", async (Todo todo, TodoDbContext db) =>
        {
            db.Todos.Add(todo);
            await db.SaveChangesAsync();
            return Results.Created($"/api/todos/{todo.Id}", todo);
        });

        // Update todo
        group.MapPut("/{id}", async (int id, Todo inputTodo, TodoDbContext db) =>
        {
            var todo = await db.Todos.FindAsync(id);
            if (todo == null) return Results.NotFound();

            todo.Description = inputTodo.Description;
            todo.IsComplete = inputTodo.IsComplete;
            
            // Update DateCompleted if the todo item is marked as complete
            if (inputTodo.IsComplete && !todo.DateCompleted.HasValue)
            {
                todo.DateCompleted = DateTime.UtcNow;
            }
            else if (!inputTodo.IsComplete)
            {
                todo.DateCompleted = null;
            }

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        // Delete todo
        group.MapDelete("/{id}", async (int id, TodoDbContext db) =>
        {
            var todo = await db.Todos.FindAsync(id);
            if (todo == null) return Results.NotFound();

            db.Todos.Remove(todo);
            await db.SaveChangesAsync();
            return Results.Ok();
        });
    }
}