using Application.Utils.StringUtils;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
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
        public IList<Curso> ObterLista()
        {
            var lista = new List<Curso>();
            using (var ctx = _appDbContext)
            {
                IEnumerable<Curso> listaCursos = from curso in ctx.Cursos select curso;

                foreach (var curso_ in listaCursos)
                {
                    lista.Add(new Curso
                    {
                        Nome = curso_.Nome,
                        IdCurso = curso_.IdCurso,
                        Descricao = curso_.Descricao,
                        DataInicio = curso_.DataInicio,
                        DataFim = curso_.DataFim,

                    });
                }
            }
            return lista;
        }

        public int Salvar(Curso curso)
        {
            if (string.IsNullOrEmpty(curso.Nome))
            {
                throw new ApplicationException("Obrigatório nome");
            }

            var resp = 0;
            using (var ctx = _appDbContext)
            {
                if (curso.IdCurso != 0)
                {
                    var cursoDB = ctx.Cursos.FirstOrDefault(c => c.IdCurso == curso.IdCurso);
                    cursoDB.Nome = curso.Nome;
                    cursoDB.Descricao = curso.Descricao;
                    ctx.Entry(cursoDB).State = EntityState.Modified;
                    ctx.Update(cursoDB);
                }
                else
                {
                    curso.DataInicio = new DateOnly();
                    ctx.Cursos.Add(curso);
                }
                resp = ctx.SaveChanges();
            }
            return resp;
        }
        public int Excluir(int IdCurso)
        {
            using (var ctx = _appDbContext)
            {
                var cursoDB = ctx.Cursos.FirstOrDefault(c => c.IdCurso == IdCurso);
                ctx.Cursos.Remove(cursoDB);
                ctx.SaveChanges();
            }

            return 0;
        }
    }
}
