using Application.Interaces;
using Application.Services;
using Application.Utils;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebAPI.ViewModels.MatriculaVM;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatriculaController : ControllerBase
    {
        IMatriculaService _IMatriculaService;


        public MatriculaController(IMatriculaService iMatriculaService)
        {
            _IMatriculaService = iMatriculaService;

        }
        [HttpPost()]
        //[Authorize(Roles = "administrador")]
        public IActionResult SalvarExcluir(MatriculaSalvarExcluirVM matricula)
        {
            var result = new ReturnInfo<int>();
            try
            {
                result = _IMatriculaService.SalvarExcluir(
                    new Matricula { IdCurso = matricula.IdCurso, IdUsuario = matricula.IdUsuario },
                    matricula.Operacao);
                result.Message = "Matricula Alterada com sucesso!";
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
