using Microsoft.EntityFrameworkCore;
using TodoApp.Data;

namespace TodoApp.MigrationService;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public Worker(ILogger<Worker> logger, IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Migration Service starting at: {time}", DateTimeOffset.Now);
        
        try
        {
            // Create a new scope to retrieve scoped services
            using (var scope = _scopeFactory.CreateScope())
            {
                // Get the DbContext instance
                var dbContext = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
                
                _logger.LogInformation("Starting database migration...");
                
                // Apply pending migrations
                await dbContext.Database.MigrateAsync(stoppingToken);
                
                _logger.LogInformation("Database migration completed successfully");
            }
            
            // After migration is complete, we stop the service since it's no longer needed
            _logger.LogInformation("Migration Service completed. Stopping service.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while migrating the database");
            throw; // Rethrow to stop the service with error
        }
        
        // Stop the service once the migration is complete
        await StopAsync(stoppingToken);
    }
}
