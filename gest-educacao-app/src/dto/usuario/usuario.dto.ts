export interface IUsuarioDTO{
    IdUsuario:number;
    Nome:string;
    Email:string;
    Senha:string;
}

export interface IUsuarioSalvarDTO{
    Nome:string;
    Email:string;
    Senha:string;
}

export interface IUsuarioCursosDTO{
    IdUsuario:number;
    UsuarioNome:string;
    IdCursos:number[];
}