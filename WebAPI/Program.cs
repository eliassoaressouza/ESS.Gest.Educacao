using Infrastructure.IoC;

var builder = WebApplication.CreateBuilder(args);
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
// Add services to the container.
DependencyContainer.RegisterSevices(builder.Services, connection);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var myPolicyName = "MyPolicyName"; // you will specify the exact same string in different places, so assigning policy names to variables avoids potential typo mistakes.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myPolicyName,
      configurePolicy: policy =>
      {
          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
          policy.WithOrigins("http://localhost:3000");
      });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors(myPolicyName);
app.Run();
