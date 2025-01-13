"use client"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ListaCursos from './ListaCursos/listacursos';
import { ICursoDTO } from '@/dto/curso/curso.dto';
import { CursoApiClient } from '@/apiclient/curso.api.client';
import { CursoForm, FormCursoHandle } from './CursoForm/cursoform';
import { Button } from '@/components/ui/button';


export default function CursoPage() {
  const [listaCursos, setlistaCurso] = useState([] as ICursoDTO[]);
  const formRef = useRef<FormCursoHandle>(null);

  const listarCursosCallBack = useCallback(async () => {
    await listarCursos();
  }, []);
  async function listarCursos(){
    const respApi = await new CursoApiClient().ObterListaTodos();
    if (respApi.Status) {
      setlistaCurso(respApi.Items as ICursoDTO[]);
    }
  }


  function carregarEditar(despesa: ICursoDTO) {
    formRef.current?.abrirDialogEditar(despesa)
  }
  function cadastroCurso(){
    formRef.current?.abrirDialogCadastro();
  }

  useEffect(() => {
    listarCursosCallBack();
    
  }, []);

  return (
    <>
      <div className="bg-[#c8cdd8]  p-6  rounded-lg ">
        <h4>cadastro de curso</h4>
        <ListaCursos  listaCursos={listaCursos} listarCursos={listarCursos} carregarEditar={carregarEditar} />
        <Button onClick={cadastroCurso}  >Cadastro Curso</Button>
        <CursoForm  calbackPosSalvar={listarCursos} ref={formRef} />
      </div>
    </>
  );
}