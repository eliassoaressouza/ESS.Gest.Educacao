using Application.Interaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using WebAPI.AuthConfig;
using WebAPI.ViewModels.Auth;
using WebAPI.ViewModels.UsuarioVM;

namespace WebAPI.Controllers
{
    public class HomeController : ControllerBase
    {
        IUsuarioService _usuarioService;

        public HomeController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpPost]
        [Route("api/login")]
        public ActionResult Authenticate([FromBody] UsuarioLoginViewModel model)
        {
            // Recupera o usuário
            var usuarioResp = _usuarioService.Obter(model.Email, model.Senha);

            // Verifica se o usuário existe
            if (usuarioResp.Item == null)
            {
                return NotFound(new AuthReturn() { ReturnInfo = usuarioResp, Token = "" });
            }

            // Gera o Token
            var token = TokenService.GenerateToken(usuarioResp.Item);

            // Oculta a senha
            usuarioResp.Item.Senha = "";

            // Retorna os dados
            return Ok(new AuthReturn() { ReturnInfo = usuarioResp, Token= token });
        }
        [HttpPost("refresh")]
        public ActionResult Refresh(string token)
        {
            // For simplicity, assume the refresh token is valid and stored securely
            // var storedRefreshToken = _userService.GetRefreshToken(userId);

            // Verify refresh token (validate against the stored token)
            // if (storedRefreshToken != tokenResponse.RefreshToken)
            //    return Unauthorized();

            // For demonstration, let's just generate a new access token
            var newAccessToken = TokenService.GenerateAccessTokenFromRefreshToken(token);

            return Ok(new AuthReturn() { Token = newAccessToken });
        }

    }
}
