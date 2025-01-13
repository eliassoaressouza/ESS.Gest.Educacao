using Application.Utils;
using Domain.Entities;

namespace Application.Interaces
{
    public interface ICursoService
    {
        ReturnInfo<Curso> ObterLista(int idUsuario);
        ReturnInfo<Curso> ObterLista();
        ReturnInfo<int> Salvar(Curso curso);
        ReturnInfo<int> Excluir(int IdCurso);
    }
}
