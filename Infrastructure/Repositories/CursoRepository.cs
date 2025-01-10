using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CursoRepository : ICursoRepository
    {
        AppDbContext _appDbContext;

        public CursoRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IList<Curso> ObterLista(int idUsuario)
        {
            var lista = new List<Curso>();
            using (var ctx = _appDbContext)
            {
                var listaMatriculas = ctx.Matriculas.Where(m => m.IdUsuario == idUsuario);

                if (listaMatriculas != null)
                {
                    IEnumerable<Curso>
                        listaCursos = from matricula in listaMatriculas
                                      join curso in ctx.Cursos
                                      on matricula.IdCurso equals curso.IdCurso
                                      select curso;

                    foreach (var curso_ in listaCursos)
                    {
                        lista.Add(new Curso
                        {
                            Nome = curso_.Nome,
                            IdCurso = curso_.IdCurso,
                            Descricao = curso_.Descricao
                        });
                    }


                }


            }
            return lista;
        }
    }
}
