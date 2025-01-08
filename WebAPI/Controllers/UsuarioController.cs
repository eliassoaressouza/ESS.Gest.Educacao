using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebAPI.ViewModels.UsuarioVM;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost()]
        public async Task<IActionResult> Salvar(UsuarioViewModel usuario)
        {
            var result = new ReturnInfo<int>();
            try
            {
                result = await _usuarioService.CreateAsync(usuario.Nome, usuario.Email, usuario.Senha);

                return Ok(result);
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Failure";
                result.Exception = ex;
                return StatusCode(500, result);  //OR return response
            }

        }
        [HttpGet()]
        public IActionResult Listar()
        {
            var result = new ReturnInfo<Usuario>();
            try
            {
                result = _usuarioService.ObterLista();
                return Ok(result);
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
