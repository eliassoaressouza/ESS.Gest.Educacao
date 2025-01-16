
import { UsuarioApiClient } from "@/apiclient/usuario.api.client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ICursoDTO } from "@/dto/curso/curso.dto";
import { IUsuarioCursosDTO, IUsuarioDTO } from "@/dto/usuario/usuario.dto";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from '@/components/ui/checkbox';
import { MatriculaOperacaoEnum } from "@/dto/matricula/matricula.dto";
import { MatriculaApiClient } from "@/apiclient/matricula.api.client";
type ListaAlunoCurso = {
    listaTodosCursos: ICursoDTO[];
}
export default function ListaAlunoCurso({ listaTodosCursos }: ListaAlunoCurso) {
    const [listaAlunos, setlistaAlunos] = useState([] as IUsuarioDTO[]);
    const [listaUsuarioCursos, setlistaUsuarioCursos] = useState([] as IUsuarioCursosDTO[]);
    //alunos
    const listarAlunosCursosCallBack = useCallback(async () => {
        await listarAlunos();
        await listarCursos();
    }, []);
    async function listarAlunos() {
        const respApi = await new UsuarioApiClient().ObterListaAlunos();
        if (respApi.Status) {
            setlistaAlunos(respApi.Items as IUsuarioDTO[]);
        }
    }
    function selecionarAluno(aluno: IUsuarioDTO) {

    }
    async function selecionarCurso(curso: ICursoDTO, aluno: IUsuarioDTO, matriculado: boolean) {
       await matricular(curso.IdCurso,aluno.IdUsuario,matriculado);
    }

    //alunos
    //cursos
    async function listarCursos() {
        const respApi = await new UsuarioApiClient().ObterListaUsuarioCursos();
        if (respApi.Status) {
            setlistaUsuarioCursos(respApi.Items as IUsuarioCursosDTO[]);
        }

    }
    //matricular:
    async function matricular(idCurso: number, idUsuario: number, matriculado: boolean) {

        const _matriculaOperacaoEnum = matriculado ? MatriculaOperacaoEnum.EXCLUIR : MatriculaOperacaoEnum.SALVAR;
        const respApi = await new MatriculaApiClient().Salvar(
            { IdCurso: idCurso, IdUsuario: idUsuario, Operacao: _matriculaOperacaoEnum });
            await listarAlunos();
            await listarCursos();
    }

    useEffect(() => {
        listarAlunosCursosCallBack();

    }, []);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] ">Nome</TableHead>

                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listaAlunos && listaAlunos.map(aluno =>
                    <TableRow key={aluno.IdUsuario} >
                        <TableCell className="font-medium text-2xl">{aluno.Nome}</TableCell>

                        <TableCell className="font-bold text-2xl" >
                            {
                                listaTodosCursos && listaTodosCursos.map(curso =>
                                    <div key={curso.IdCurso} >

                                        <Checkbox onClick={() => {
                                            selecionarCurso(curso, aluno,
                                                listaUsuarioCursos != null &&
                                                listaUsuarioCursos.length != 0 &&
                                                listaUsuarioCursos.find(uc => uc.IdUsuario == aluno.IdUsuario &&
                                                    uc.IdCursos?.find(c => c == curso.IdCurso) != undefined) != undefined
                                            )
                                        }}


                                            checked={listaUsuarioCursos != null &&
                                                listaUsuarioCursos.length != 0 &&
                                                listaUsuarioCursos.find(uc => uc.IdUsuario == aluno.IdUsuario &&
                                                    uc.IdCursos?.find(c => c == curso.IdCurso) != undefined
                                                ) != undefined
                                            }
                                        />
                                        <label className="ml-3"  >{curso.Nome}</label>
                                    </div>
                                )
                            }
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    );
}