using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUsuarioRepository
    {
       
        Usuario Obter(string email,string senha);
        Usuario Obter(int idUsuario);
        Task<int> InsertAsync(Usuario usuario);
        
        IList<Usuario> ObterLista();
    }
}
