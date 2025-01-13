"use client"
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { CursoApiClient } from '@/apiclient/curso.api.client';
import { ICursoDTO } from '@/dto/curso/curso.dto';
export interface FormCursoHandle {
  abrirDialogEditar: (despesa: ICursoDTO) => void;
  abrirDialogCadastro: () => void;
}
type FormCursoParams = {
  calbackPosSalvar: () => Promise<void>;
}
const cursoShema = z.object({ IdCurso: z.number().default(0), Nome: z.string().min(3), Descricao: z.string() });
type CursoShema = z.infer<typeof cursoShema>

export const CursoForm = forwardRef<FormCursoHandle, FormCursoParams>(({ calbackPosSalvar }: FormCursoParams, ref: Ref<FormCursoHandle>) => {
  const [abrirDialog, setAbrirDialog] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, setValue, getValues } = useForm<CursoShema>({ resolver: zodResolver(cursoShema) });

  useImperativeHandle(ref, () => { return { abrirDialogEditar, abrirDialogCadastro } });


  async function cadastro(data: CursoShema) {
    let retorno = await new CursoApiClient().Salvar(
      { Nome: data.Nome, Descricao: data.Descricao, IdCurso: data.IdCurso } as ICursoDTO);

    if (retorno.Status) {
      await calbackPosSalvar();
      fecharDialog();
      toast({
        title: "GEST-EDUCAÇÃO",
        description: retorno.Message,
      });
    }
  }
  function abrirDialogEditar(curso: ICursoDTO) {
    setValue('IdCurso', curso.IdCurso);
    setValue('Nome', curso.Nome);
    setValue('Descricao', curso.Descricao);
    setAbrirDialog(true);
  }
  function abrirDialogCadastro() {
    setAbrirDialog(true);
    setValue('IdCurso', 0);
    setValue('Nome', '');
    setValue('Descricao', '');
  }
  function fecharDialog() {
    setAbrirDialog(false);
  }

  return (
    <Dialog key={'dialog-curso'} open={abrirDialog}   >
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {getValues('IdCurso') == 0 ? 'Novo' : 'Editar'} Curso</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(cadastro)} >
          <input type='hidden'  {...register("IdCurso")} />
          <div className="grid sm:grid-cols-1 gap-10">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Nome</label>
              <input type="text" {...register('Nome')} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />

            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Descrição</label>
              <textarea  {...register('Descricao')} className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Descrição" >
              </textarea>

            </div>
          </div>
          <div className="!mt-12 space-x-4">
            <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Salvar
            </button>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <Button onClick={fecharDialog} type="button" variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
});