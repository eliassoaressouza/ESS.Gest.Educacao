using Application.Interaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatriculaController : ControllerBase
    {
        IMatriculaService _IMatriculaService;
        IUsuarioService _usuarioService;

        public MatriculaController(IMatriculaService iMatriculaService, IUsuarioService usuarioService)
        {
            _IMatriculaService = iMatriculaService;
            _usuarioService = usuarioService;
        }

        
    }
}
