
export enum MatriculaOperacaoEnum{
    SALVAR = 1, EXCLUIR = 2,
}

export interface IMatriculaDTO{
    IdUsuario:number;
    IdCurso:number;
    Operacao:MatriculaOperacaoEnum;
}