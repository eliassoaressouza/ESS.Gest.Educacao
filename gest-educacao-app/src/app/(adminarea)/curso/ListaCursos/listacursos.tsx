import React, { useState } from 'react';
import { Table, TableBody,  TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ICursoDTO } from '@/dto/curso/curso.dto';
import { CursoApiClient } from '@/apiclient/curso.api.client';
import { useToast } from '@/hooks/use-toast';
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

type ListaCursos = {
    listaCursos: ICursoDTO[],
    carregarEditar: (curso: ICursoDTO) => void;
    listarCursos:()=>Promise<void>
}
export default function ListaCursos(props: ListaCursos) {
    const [curso, setCurso] = useState({} as ICursoDTO);
    const [openDialog, setOpenDialog] = useState(false);
    const { toast } = useToast();

    async function carregarEditarHandler(curso: ICursoDTO) {
        props.carregarEditar(curso);
    }
     function comfirmExcluir(curso: ICursoDTO) {
        openCloseDialog();
        setCurso(curso);
      
    }
    async function excluir() {
        let resp = await new CursoApiClient().Excluir(curso.IdCurso);
       
        if (resp.Status) {
            openCloseDialog();
           await props.listarCursos();
            toast({
                title: "GEST-EDUCAÇÃO",
                description: resp.Message,
            });
        }
    }
    function openCloseDialog() {
        setOpenDialog(!openDialog);
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.listaCursos && props.listaCursos.map(curso =>
                        <TableRow key={curso.IdCurso} >
                            <TableCell className="font-medium">{curso.Nome}</TableCell>
                            <TableCell >
                                <button onClick={() => { carregarEditarHandler(curso) }} type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Editar
                                </button>
                            </TableCell>
                            <TableCell >
                                <button onClick={() => { comfirmExcluir(curso) }} type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">
                                    Excluir
                                </button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <AlertDialog key={'excluir-curso'} open={openDialog} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja Excluir Curso {curso.Nome}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente o curso
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={openCloseDialog} >Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={excluir} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}