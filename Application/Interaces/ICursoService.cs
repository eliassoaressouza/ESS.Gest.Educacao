using Application.Utils;
using Domain.Entities;

namespace Application.Interaces
{
    public interface ICursoService
    {
        ReturnInfo<Curso> ObterLista(int idUsuario);
    }
}
