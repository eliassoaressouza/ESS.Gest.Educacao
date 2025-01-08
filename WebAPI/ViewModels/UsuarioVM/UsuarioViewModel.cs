namespace WebAPI.ViewModels.UsuarioVM
{
    public class UsuarioViewModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
    public class UsuarioLoginViewModel
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
