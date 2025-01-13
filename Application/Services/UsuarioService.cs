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
         
            return result;
        }
        public ReturnInfo<Usuario> ObterLista()
        {
            var result = new ReturnInfo<Usuario>();

            result.Items = _usuarioRepository.ObterLista();
          
            return result;
        }
        public ReturnInfo<Usuario> Obter(string email, string senha)
        {
            var result = new ReturnInfo<Usuario>();

            result.Item = _usuarioRepository.Obter(email, senha);

            if (result.Item == null)
            {
                result.Message = "Usuário ou senha inválidos!";
                result.Status = false;
            }

            return result;
        }

        public ReturnInfo<Usuario> Obter(int idUsuario)
        {
            var result = new ReturnInfo<Usuario>();

            result.Item = _usuarioRepository.Obter(idUsuario);

            if (result.Item == null)
            {
                result.Message = "obrigatório id usuario!";
                result.Status = false;
            }

            return result;
        }

        public IList<Usuario> ObterListaComMatriculas()
        {
            return _usuarioRepository.ObterListaComMatriculas();
        }
    }
}
