"use client"
import { useCallback, useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard/dashboard";
import { ICursoDTO } from "@/dto/curso/curso.dto";
import { CursoApiClient } from "@/apiclient/curso.api.client";
import { AppContext } from "@/context/AuthContext";


export default function Home() {
  const [listaCursos, setlistaCurso] = useState([] as ICursoDTO[]);
  const {  state } = useContext(AppContext);
  const listarCursosCallBack = useCallback(async () => {
    await listarCursos();
  }, []);

  async function listarCursos() {
    const respApi = await new CursoApiClient().ObterLista(state?state.IdUsuario:0)
    if (respApi.Status) {
      setlistaCurso(respApi.Items as ICursoDTO[]);
    }
  }

  useEffect(() => {
    
    listarCursosCallBack();

  }, []);
  return (
    <>
      <Dashboard listaCursos={listaCursos} />
    </>

  );
}


