using Application.Interaces;
using Application.Utils;
using Domain.Entities;
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
    }
}
