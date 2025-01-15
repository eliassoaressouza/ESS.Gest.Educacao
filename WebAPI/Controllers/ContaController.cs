using Application.Interaces;
using Application.Utils;
using Microsoft.AspNetCore.Mvc;
using WebAPI.AuthConfig;
using WebAPI.ViewModels.Auth;
using WebAPI.ViewModels.UsuarioVM;
namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContaController : ControllerBase
    {
        IUsuarioService _usuarioService;

        public ContaController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpPost]
        [Route("login")]
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
            return Ok(new AuthReturn() { ReturnInfo = usuarioResp, Token = token });
        }
        [HttpPost("refresh")]
        public ActionResult Refresh([FromBody] AuthRefresh authRefresh)
        {
            var result = new ReturnInfo<AuthReturn>();
            try
            {
                var id = TokenService.GetName(authRefresh.Token);
                var ReturnInfoResp = _usuarioService.Obter(int.Parse(id));

                var newAccessToken = TokenService.GenerateToken(ReturnInfoResp.Item);

                return Ok(new AuthReturn() { Token = newAccessToken, ReturnInfo = ReturnInfoResp });
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Failure";
                result.Exception = ex;
                return StatusCode(500, result);  //OR return response

            }

        }
    }
}
