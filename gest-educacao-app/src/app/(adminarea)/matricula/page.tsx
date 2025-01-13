"use client"
import { CursoApiClient } from '@/apiclient/curso.api.client';
import { ICursoDTO } from '@/dto/curso/curso.dto';
import React, { useCallback, useEffect, useState } from 'react';
import ListaCursoMatricula from './ListaCursoMatricula/listacursomatricula';
import AlunosCurso from './AlunosCurso/alunoscurso';
import { IUsuarioCursosDTO, IUsuarioDTO } from '@/dto/usuario/usuario.dto';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UsuarioApiClient } from '@/apiclient/usuario.api.client';

export default function matricula() {
    const [listaCursos, setlistaCurso] = useState([] as ICursoDTO[]);
    const [listaUsuarioCursos, setlistaUsuarioCursos] = useState([] as IUsuarioCursosDTO[]);
    const [curso, setCurso] = useState<ICursoDTO | null>(null);
    const listarCursosCallBack = useCallback(async () => {
        await listarCursos();
    }, []);
    async function listarCursos() {
        const respApi = await new CursoApiClient().ObterListaTodos();
        if (respApi.Status) {
            setlistaCurso(respApi.Items as ICursoDTO[]);
        }
    }
    async function selecionarCurso(curso: ICursoDTO) {
        const respApi = await new UsuarioApiClient().ObterListaUsuarioCursos();
        if (respApi.Status) {
            setlistaUsuarioCursos(respApi.Items as IUsuarioCursosDTO[]);
        }
        setCurso(curso);
    }
    function limpar() {
        setCurso(null);
    }

    useEffect(() => {
        listarCursosCallBack();

    }, []);
    return (
        <div className="bg-[#c8cdd8]  p-6  rounded-lg "  >
            <ListaCursoMatricula listaCursos={listaCursos} selecionarCurso={selecionarCurso} />
            <Button onClick={limpar} >Limpar</Button>
            <Separator orientation="horizontal" />
            <AlunosCurso listaUsuarioCursos={listaUsuarioCursos} curso={curso} />
        </div>
    );
}