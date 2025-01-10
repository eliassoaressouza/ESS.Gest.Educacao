namespace Domain.Entities
{
    public class Usuario
    {
        public int IdUsuario { get; set; }

        public string Nome { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Senha { get; set; }

        public virtual ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
    }
}
