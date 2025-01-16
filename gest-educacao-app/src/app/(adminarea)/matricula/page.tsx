"use client"
import { CursoApiClient } from '@/apiclient/curso.api.client';
import { ICursoDTO } from '@/dto/curso/curso.dto';
import React, { useCallback, useEffect, useState } from 'react';
import ListaCursoMatricula from './ListaCursoMatricula/listacursomatricula';
import AlunosCurso from './ListaCursoMatricula/AlunosCurso/alunoscurso';
import { IUsuarioCursosDTO } from '@/dto/usuario/usuario.dto';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UsuarioApiClient } from '@/apiclient/usuario.api.client';
import { MatriculaApiClient } from '@/apiclient/matricula.api.client';
import { MatriculaOperacaoEnum } from '@/dto/matricula/matricula.dto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListaAlunoCurso from './ListaAlunoCurso/listaalunocurso';


export default function matricula() {

    const [listaTodosCursos, setlistaTodosCursos] = useState([] as ICursoDTO[]);
    async function listarTodosCursos() {
        const respApi = await new CursoApiClient().ObterListaTodos();
        if (respApi.Status) {
            setlistaTodosCursos(respApi.Items as ICursoDTO[]);
        }
    }
    const listarTodosCursosCallBack = useCallback(async () => {await listarTodosCursos();}, []);
    useEffect(() => {
        listarTodosCursosCallBack();

    }, []);
    return (
        <div className="bg-[#c8cdd8]  p-6  rounded-lg "  >
            <Tabs defaultValue="cursos"  >
                <TabsList>
                    <TabsTrigger value="cursos">Lista de Cursos</TabsTrigger>
                    <TabsTrigger value="alunos">Lista de Alunos</TabsTrigger>
                </TabsList>
                <TabsContent value="cursos"   >
                    <ListaCursoMatricula listaTodosCursos={listaTodosCursos} />
                    
                </TabsContent>
                <TabsContent value="alunos">
                   <ListaAlunoCurso listaTodosCursos={listaTodosCursos}  />
                </TabsContent>

            </Tabs>
        </div>
    );
}