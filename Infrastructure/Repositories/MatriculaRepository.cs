using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class MatriculaRepository : IMatriculaRepository
    {
        AppDbContext _appDbContext;

        public MatriculaRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IList<Matricula> ObterLista()
        {
            var lista = new List<Matricula>();
            using (var ctx = _appDbContext)
            {

                foreach (var mat in ctx.Matriculas)
                {
                    lista.Add(new Matricula { IdMatricula = mat.IdMatricula, IdCurso = mat.IdCurso, IdUsuario = mat.IdUsuario });
                }
              
            }
            return lista;

        }
    }
}
