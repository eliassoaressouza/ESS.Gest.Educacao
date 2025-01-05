using Domain.Entities;

namespace Application.Interaces
{
    public interface IUsuarioService
    {
         Task<int> CreateAsync(string nome, string email);

        List<Usuario> ObterLista();
    }
}
