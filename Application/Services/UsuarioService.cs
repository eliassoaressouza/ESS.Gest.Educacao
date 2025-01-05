using Application.Interaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class UsuarioService:IUsuarioService
    {

        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<int> CreateAsync(string nome,string email)
        {
            var user = new Usuario { 
              
                Nome = nome,
                Email = email};
            var userId = await _usuarioRepository.InsertAsync(user);
            return userId;
        }
        public List<Usuario> ObterLista()
        {
            return _usuarioRepository.ObterLista();
        }
    }
}
