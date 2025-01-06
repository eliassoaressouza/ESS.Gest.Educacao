using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        AppDbContext _appDbContext;

        public UsuarioRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Usuario> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> InsertAsync(Usuario usuario)
        {
            var resp = 0;
            try
            {

                using (var ctx = _appDbContext)
                {
                    ctx.Usuario.Add(usuario);
                    resp = await ctx.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {


            }
            return resp;
        }

        public IList<Usuario> ObterLista()
        {
            var lista = new List<Usuario>();
            using (var ctx = _appDbContext)
            {
                foreach (var item in ctx.Usuario)
                {

                    lista.Add(new Usuario { Email=item.Email,Id=item.Id,Nome=item.Nome});

                }
            }
            return lista;
        }

        public Task UpdateAsync(Usuario usuario)
        {
            throw new NotImplementedException();
        }
    }
}
