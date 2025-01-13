using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICursoRepository
    {
        IList<Curso> ObterLista(int idUsuario);
        IList<Curso> ObterLista();
        int Salvar(Curso curso);
        int Excluir(int IdCurso);
    }
}
