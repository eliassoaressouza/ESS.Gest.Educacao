import { ICursoDTO } from '@/dto/curso/curso.dto';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

type ListaCursoMatricula = {
    listaCursos: ICursoDTO[],
    selecionarCurso:(curso: ICursoDTO)=>Promise<void>
}
export default function ListaCursoMatricula({listaCursos,selecionarCurso}:ListaCursoMatricula) {


    


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listaCursos && listaCursos.map(curso =>
                        <TableRow key={curso.IdCurso} >
                            <TableCell className="font-medium">{curso.Nome}</TableCell>
                            <TableCell >
                                <button onClick={() => { selecionarCurso(curso) }} type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Alunos
                                </button>
                            </TableCell>

                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}