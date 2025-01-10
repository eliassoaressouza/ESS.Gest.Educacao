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

        public ReturnInfo<Curso> ObterLista(int idUsuario)
        {
            var result = new ReturnInfo<Curso>();

            result.Items = _CursoRepository.ObterLista(idUsuario);

            return result;

        }
    }
}
