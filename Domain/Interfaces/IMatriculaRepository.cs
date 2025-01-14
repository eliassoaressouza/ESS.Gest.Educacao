using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMatriculaRepository
    {
        int Salvar(Matricula matricula);
        int Excluir(int IdUsuario, int IdCurso);
    }
}