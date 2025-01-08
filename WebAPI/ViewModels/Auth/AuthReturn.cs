using Application.Utils;
using Domain.Entities;

namespace WebAPI.ViewModels.Auth
{
    public class AuthReturn
    {
        public string Token { get; set; }
        public ReturnInfo<Usuario> ReturnInfo { get; set; }
    }
}
