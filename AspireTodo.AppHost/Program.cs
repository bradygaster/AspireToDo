var builder = DistributedApplication.CreateBuilder(args);

builder.AddDockerComposePublisher();

// Add a SQL Server resource
var sqlServer = builder.AddSqlServer("sql-server").AddDatabase("TodoDb");

// Add the migration service first and configure it to use the SQL Server
var todoMigrations = builder.AddProject<Projects.TodoApp_MigrationService>("migrations")
    .WaitFor(sqlServer)
    .WithReference(sqlServer);

// Add the API, referencing SQL Server, but make it wait for the migration service
var todoApi = builder.AddProject<Projects.TodoAPI>("todoapi")
    .WaitFor(todoMigrations)
    .WithExternalHttpEndpoints()
    .WithReference(sqlServer);

var frontend = builder.AddNpmApp("frontend", "../todoapp.client")
    .WithReference(todoApi)
    .WaitFor(todoApi)
    .WithEnvironment("BROWSER", "none") // Disable opening browser on npm start
    .WithEnvironment("TODO_API_URL", todoApi.GetEndpoint("http"))
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

todoApi.WithReference(frontend); // cors

builder.Build().Run();
