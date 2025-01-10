namespace Domain.Entities
{
    public class Matricula
    {
        public int IdMatricula { get; set; }

        public int IdUsuario { get; set; }

        public int IdCurso { get; set; }

        public DateTime Data { get; set; }

        public virtual Curso IdCursoNavigation { get; set; } = null!;

        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
    }
}
