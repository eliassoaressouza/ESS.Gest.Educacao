import { ICursoDTO } from '@/dto/curso/curso.dto';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { IUsuarioCursosDTO, IUsuarioDTO } from '@/dto/usuario/usuario.dto';
import { Checkbox } from '@/components/ui/checkbox';



type AlunosCurso = {
  listaUsuarioCursos: IUsuarioCursosDTO[],
  curso: ICursoDTO | null
}

export default function AlunosCurso({ curso, listaUsuarioCursos }: AlunosCurso) {
  return (
    <>
      {curso ?
      <div>
        <p>Curso: {curso.Nome}</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome do Aluno</TableHead>
              <TableHead>Matriculado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listaUsuarioCursos && listaUsuarioCursos.map(usuario =>
              <TableRow key={usuario.IdUsuario} >
                <TableCell className="font-medium">{usuario.UsuarioNome}</TableCell>
                <TableCell >
                <Checkbox  checked={usuario.IdCursos&&usuario.IdCursos.find(c=>c==curso.IdCurso)!=undefined?true:false} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        : <div></div>
      }
    </>
  );
}