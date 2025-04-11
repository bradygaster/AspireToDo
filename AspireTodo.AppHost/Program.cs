var builder = DistributedApplication.CreateBuilder(args);

// Add a SQL Server resource
var sqlServer = builder.AddSqlServer("sql-server").AddDatabase("TodoDb");

// Add the migration service first and configure it to use the SQL Server
// Using explicit string path to reference the project without type parameters
var todoMigrations = builder.AddProject<Projects.TodoApp_MigrationService>("migrations")
    .WaitFor(sqlServer)
    .WithReference(sqlServer);

// Add the API, referencing SQL Server, but make it wait for the migration service
var todoApi = builder.AddProject<Projects.TodoAPI>("todoapi")
    .WaitFor(todoMigrations)
    .WithReference(sqlServer)
    .WithExternalHttpEndpoints();

builder.AddNpmApp("frontend", "../AspireToDo")
    .WithReference(todoApi)
    .WaitFor(todoApi)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
