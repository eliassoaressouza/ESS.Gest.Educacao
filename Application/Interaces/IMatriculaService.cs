using Application.Utils;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Interaces
{
    public  interface IMatriculaService
    {
       

        ReturnInfo<Matricula> ObterLista();
    }
}
