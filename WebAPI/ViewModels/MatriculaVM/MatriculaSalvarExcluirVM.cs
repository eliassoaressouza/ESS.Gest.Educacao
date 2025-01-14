using Application.Enums;

namespace WebAPI.ViewModels.MatriculaVM
{
    public class MatriculaSalvarExcluirVM
    {
        public int IdUsuario { get; set; }

        public int IdCurso { get; set; }

        public MatriculaOperacaoEnum Operacao { get; set; }
    }
}
