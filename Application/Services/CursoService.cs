using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class CursoService : ICursoService
    {
        private readonly ICursoRepository _CursoRepository;

        public CursoService(ICursoRepository cursoRepository)
        {
            _CursoRepository = cursoRepository;
        }

        public ReturnInfo<int> Excluir(int IdCurso)
        {
            var result = new ReturnInfo<int>();

            result.Item = _CursoRepository.Excluir(IdCurso);

            return result;
        }

        public ReturnInfo<Curso> ObterLista(int idUsuario)
        {
            var result = new ReturnInfo<Curso>();

            result.Items = _CursoRepository.ObterLista(idUsuario);

            return result;

        }

        public ReturnInfo<Curso> ObterLista()
        {
            var result = new ReturnInfo<Curso>();

            result.Items = _CursoRepository.ObterLista();

            return result;
        }

        public ReturnInfo<int> Salvar(Curso curso)
        {
            var result = new ReturnInfo<int>();

            result.Item = _CursoRepository.Salvar(curso);

            return result;
        }
    }
}
