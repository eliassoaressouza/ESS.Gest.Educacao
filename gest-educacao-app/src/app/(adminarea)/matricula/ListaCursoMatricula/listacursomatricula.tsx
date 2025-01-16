import { ICursoDTO } from '@/dto/curso/curso.dto';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useEffect, useState } from 'react';
import { IUsuarioCursosDTO } from '@/dto/usuario/usuario.dto';
import { UsuarioApiClient } from '@/apiclient/usuario.api.client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AlunosCurso from './AlunosCurso/alunoscurso';
import { MatriculaOperacaoEnum } from '@/dto/matricula/matricula.dto';
import { MatriculaApiClient } from '@/apiclient/matricula.api.client';

type ListaCursoMatricula = {
    listaTodosCursos: ICursoDTO[];
}
export default function ListaCursoMatricula({ listaTodosCursos }: ListaCursoMatricula) {
    //curso
    const [listaUsuarioCursos, setlistaUsuarioCursos] = useState([] as IUsuarioCursosDTO[]);
    const [curso, setCurso] = useState<ICursoDTO | null>(null);

    async function selecionarCurso(curso: ICursoDTO) {
        const respApi = await new UsuarioApiClient().ObterListaUsuarioCursos();
        if (respApi.Status) {
            setlistaUsuarioCursos(respApi.Items as IUsuarioCursosDTO[]);
        }
        setCurso(curso);
    }
    function limparCurso() {
        setCurso(null);
    }
    ////curso
    async function matricular(idCurso: number, idUsuario: number, matriculado: boolean) {

        const _matriculaOperacaoEnum = matriculado ? MatriculaOperacaoEnum.EXCLUIR : MatriculaOperacaoEnum.SALVAR;
        const respApi = await new MatriculaApiClient().Salvar(
            { IdCurso: idCurso, IdUsuario: idUsuario, Operacao: _matriculaOperacaoEnum });
        await selecionarCurso({ IdCurso: idCurso } as ICursoDTO);
    }
    useEffect(() => {


    }, []);
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listaTodosCursos && listaTodosCursos.map(curso =>
                        <TableRow key={curso.IdCurso} >
                            <TableCell className="font-medium">{curso.Nome}</TableCell>
                            <TableCell >
                                <button onClick={() => { selecionarCurso(curso) }} type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Alunos Matriculados
                                </button>
                            </TableCell>

                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {curso != null ? <Button onClick={limparCurso} >Limpar</Button> : <></>}
            <Separator orientation="horizontal" />
            <AlunosCurso calbackPosClickCheck={matricular} listaUsuarioCursos={listaUsuarioCursos} curso={curso} />
        </div>
    );
}