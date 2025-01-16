import { ICursoDTO } from '@/dto/curso/curso.dto';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { IUsuarioCursosDTO } from '@/dto/usuario/usuario.dto';
import { Checkbox } from '@/components/ui/checkbox';



type AlunosCurso = {
  listaUsuarioCursos: IUsuarioCursosDTO[],
  curso: ICursoDTO | null,
  calbackPosClickCheck: (idCurso:number,idUsuario:number,matriculado:boolean) => Promise<void>;
}

export default function AlunosCurso({ curso, listaUsuarioCursos,calbackPosClickCheck }: AlunosCurso) {
  return (
    <>
      {curso ?
      <div>
        <h1 className='font-mono font-medium text-xl ' >Matrículas no Curso: {curso.Nome}</h1>
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
                <Checkbox onClick={()=>{calbackPosClickCheck(curso.IdCurso,usuario.IdUsuario,
                  usuario.IdCursos&&usuario.IdCursos.find(c=>c==curso.IdCurso)!=undefined?true:false
                )}} 
                 checked={usuario.IdCursos&&usuario.IdCursos.find(c=>c==curso.IdCurso)!=undefined?true:false} />
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