using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : ControllerBase
    {
        ICursoService _cursoService;

        public CursoController(ICursoService cursoService)
        {
            _cursoService = cursoService;
        }
        [HttpGet()]
        [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Listar(int idusuario)
        {
            var result = new ReturnInfo<Curso>();
            try
            {
                result = _cursoService.ObterLista(idusuario);
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
        [Route("listartodos")]
        public IActionResult Listar()
        {
            var result = new ReturnInfo<Curso>();
            try
            {
                result = _cursoService.ObterLista();
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
        [HttpPost()]
        //[Authorize(Roles = "administrador")]
        public IActionResult Salvar(Curso curso)
        {
            var result = new ReturnInfo<int>();
            try
            {
                result = _cursoService.Salvar(curso);
                result.Message = "Curso Salvo com sucesso!";
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
        [HttpDelete()]
        //[Authorize(Roles = "administrador")]
        public IActionResult Excluir(int IdCurso)
        {
            var result = new ReturnInfo<int>();
            try
            {
                result = _cursoService.Excluir(IdCurso);
                result.Message = "Curso Excluido com sucesso!";
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
