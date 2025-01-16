using Infrastructure.IoC;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.AuthConfig;

var builder = WebApplication.CreateBuilder(args);
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
// Add services to the container.
DependencyContainer.RegisterSevices(builder.Services, connection);

builder.Services.AddControllers().AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var myPolicyName = "MyPolicyName"; // you will specify the exact same string in different places, so assigning policy names to variables avoids potential typo mistakes.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myPolicyName,
      configurePolicy: policy =>
      {
          policy.AllowAnyOrigin().SetIsOriginAllowed((host) => true).AllowAnyHeader().AllowAnyMethod();
          policy.WithOrigins("http://localhost:3000");
      });
});
//auth JWT
var key = Encoding.ASCII.GetBytes(Settings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
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
////auth JWT
app.UseAuthentication();
app.UseAuthorization();
app.Run();
