using Application.Enums;
using Application.Utils;
using Domain.Entities;

namespace Application.Interaces
{
    public  interface IMatriculaService
    {
        ReturnInfo<int> SalvarExcluir(Matricula matricula,MatriculaOperacaoEnum operacao);
    }
}
