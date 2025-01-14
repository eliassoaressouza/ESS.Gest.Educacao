using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class MatriculaRepository : IMatriculaRepository
    {
        AppDbContext _appDbContext;

        public MatriculaRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public int Salvar(Matricula matricula)
        {
            if (matricula.IdCurso == 0 || matricula.IdUsuario == 0)
            {
                throw new ApplicationException("Obrigatório IdCurso e IdUsuario");
            }
            var resp = 0;
            using (var ctx = _appDbContext)
            {
                ctx.Matriculas.Add(matricula);

                resp = ctx.SaveChanges();
            }
            return resp;
        }
        public int Excluir(int IdUsuario,int IdCurso)
        {
            using (var ctx = _appDbContext)
            {
                var matricula= ctx.Matriculas.FirstOrDefault(c => c.IdUsuario == IdUsuario&&c.IdCurso==IdCurso);
                ctx.Matriculas.Remove(matricula);
                ctx.SaveChanges();
            }
            return 0;
        }
    }
}
