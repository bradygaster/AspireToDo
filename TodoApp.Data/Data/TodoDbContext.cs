using Microsoft.EntityFrameworkCore;
using TodoApp.Data.Models;

namespace TodoApp.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; }
}