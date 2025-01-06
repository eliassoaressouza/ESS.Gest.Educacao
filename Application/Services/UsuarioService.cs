using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class UsuarioService : IUsuarioService
    {

        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<ReturnInfo<int>> CreateAsync(string nome, string email, string senha)
        {
            var result = new ReturnInfo<int>();
            var user = new Usuario
            {
                Senha = senha,
                Nome = nome,
                Email = email
            };
            var userId = await _usuarioRepository.InsertAsync(user);
            result.Message = "Usuário Salvo com sucesso!!";
            return result;
        }
        public ReturnInfo<Usuario> ObterLista()
        {
            var result = new ReturnInfo<Usuario>();

            result.Items = _usuarioRepository.ObterLista();
          
            return result;
        }
    }
}
