var builder = DistributedApplication.CreateBuilder(args);

var todoApi = builder.AddProject<Projects.TodoAPI>("todoapi");

builder.Build().Run();
