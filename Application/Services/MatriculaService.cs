using Application.Enums;
using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class MatriculaService : IMatriculaService
    {
        private readonly IMatriculaRepository _MatriculaRepository;

        public MatriculaService(IMatriculaRepository matriculaRepository)
        {
            _MatriculaRepository = matriculaRepository;
        }

        public ReturnInfo<int> SalvarExcluir(Matricula matricula, MatriculaOperacaoEnum operacao)
        {
            var result = new ReturnInfo<int>();
            if (operacao== MatriculaOperacaoEnum.SALVAR)
            {
                _MatriculaRepository.Salvar(
                    new Matricula { IdCurso = matricula.IdCurso, IdUsuario = matricula.IdUsuario,Data=DateTime.Now });
            }
            else if(operacao == MatriculaOperacaoEnum.EXCLUIR)
            {
                _MatriculaRepository.Excluir(matricula.IdUsuario, matricula.IdCurso);
            }
            return result;

        }
    }
}
