using Application.Utils;
using Domain.Entities;

namespace Application.Interaces
{
    public interface IUsuarioService
    {
        Task<ReturnInfo<int>> CreateAsync(string nome, string email,string senha);

        ReturnInfo<Usuario> ObterLista();
    }
}
