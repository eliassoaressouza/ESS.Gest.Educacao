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
                result.Message = "Usuário Salvo com sucesso!!";
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
        [HttpGet()]
        [Route("listarusuariocursos")]
        public IActionResult ListarUsuarioCursos()
        {
            var result = new ReturnInfo<UsuarioCursosVM>();
            try
            {
                var matriculasResp = new List<UsuarioCursosVM>();



                var usuarios = _usuarioService.ObterListaComMatriculas();

                foreach (var usuario in usuarios)
                {
                    var matricula = new UsuarioCursosVM();
                    matricula.IdUsuario = usuario.IdUsuario;
                    matricula.UsuarioNome = usuario.Nome;

                    if (usuario.Matriculas != null && usuario.Matriculas.Any())
                    {
                        matricula.IdCursos = usuario.Matriculas.Select(m => m.IdCurso).ToArray();
                    }
                    matriculasResp.Add(matricula);
                }
                result.Items = matriculasResp;

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
        [Route("listaralunos")]
        public IActionResult ListarAlunos()
        {
            var result = new ReturnInfo<Usuario>();
            try
            {
                result = _usuarioService.ObterListaAlunos();
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
