using System.Text;

Console.OutputEncoding = Encoding.UTF8;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres", builder.AddParameter("pg-user", false), builder.AddParameter("pg-passwd", secret: true))
    .WithContainerName("postgres")
    .WithDataVolume("postgres")
    .WithImage("postgres", "17.4")
    .WithEndpoint("tcp", options =>
    {
        options.Port = 5432;
    })
    .AddDatabase("mcp");


builder.AddProject<Projects.Wallee_Mcp_HttpApi_Host>("mcp-server", "http")
    .WaitFor(postgres)
    .WithReference(postgres);

builder.Build().Run();
