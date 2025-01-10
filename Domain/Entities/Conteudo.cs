namespace Domain.Entities
{
    public class Conteudo
    {
        public int IdConteudo { get; set; }

        public string Titulo { get; set; } = null!;

        public string? ConteudoTxt { get; set; }

        public byte[]? Arquivo { get; set; }

        public int CursoId { get; set; }

        public virtual Curso Curso { get; set; } = null!;
    }
}
