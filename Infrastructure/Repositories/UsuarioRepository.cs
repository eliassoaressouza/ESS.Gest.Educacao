using Application.Utils.StringUtils;
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
        public async Task<int> InsertAsync(Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Email)&&string.IsNullOrEmpty(usuario.Senha))
            {
                throw new ApplicationException("Obrigatório email e senha");
            }
            usuario.Senha = MD5Hash.GerarHashMd5(usuario.Senha);
            var resp = 0;
            try
            {

                using (var ctx = _appDbContext)
                {
                    ctx.Usuarios.Add(usuario);
                    resp = await ctx.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {


            }
            return resp;
        }

        public Usuario Obter(string email, string senha)
        {
            //validações:
            if(string.IsNullOrEmpty(email) || string.IsNullOrEmpty(senha))
            {
                throw new ApplicationException("Obrigatório email e senha");
            }
            var usuario = new Usuario();
            using (var ctx = _appDbContext)
            {
                usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == MD5Hash.GerarHashMd5(senha));
            }

            return usuario;
        }

        public Usuario Obter(int idUsuario)
        {
            var usuario = new Usuario();
            using (var ctx = _appDbContext)
            {
                usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario==idUsuario);
            }
            return usuario;
        }

        public IList<Usuario> ObterLista()
        {
            var lista = new List<Usuario>();
            using (var ctx = _appDbContext)
            {
                foreach (var item in ctx.Usuarios)
                {

                    lista.Add(new Usuario { Email = item.Email, IdUsuario = item.IdUsuario, Nome = item.Nome });

                }
            }
            return lista;
        }

       
    }
}
