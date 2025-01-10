namespace Domain.Entities
{
    public class Curso
    {
        public int IdCurso { get; set; }

        public string Nome { get; set; } = null!;

        public string? Descricao { get; set; }

        public DateOnly? DataInicio { get; set; }

        public DateOnly? DataFim { get; set; }

        public virtual ICollection<Conteudo> Conteudos { get; set; } = new List<Conteudo>();

        public virtual ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
    }
}
