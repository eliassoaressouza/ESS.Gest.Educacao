namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost()]
        public async Task<int> Salvar(string nome,string email)
        {
            try
            {
                return await _usuarioService.CreateAsync(nome, email);
            }
            catch (Exception)
            {

                return BadRequest("Request Inválido!");
            }
            
        }
        [HttpGet()]
        public List<Usuario> Listar()
        {
            return  _usuarioService.ObterLista();
        }
    }
}
