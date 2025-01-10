
"use client"
import { AppContext } from "@/context/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import BarraLateral from "./BarraLateral/barralateral";
import PainelPrincipal from "./PainelPrincipal/painelprincipal";
import { ICursoDTO } from "@/dto/curso/curso.dto";
import { CursoApiClient } from "@/apiclient/curso.api.client";

export default function Home() {
  const { state } = useContext(AppContext);
  const [listaCurso, setlistaCurso] = useState([] as ICursoDTO[]);
  const obterlista = useCallback(async () => {

    if (state) {
      var respApi = await new CursoApiClient().ObterLista(state.idUsuario);
      if (respApi.status) {
        setlistaCurso(respApi.items as ICursoDTO[]);
      }
    }

  }, []);

  useEffect(() => {
    console.log('atualizando!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+Date.now());
    console.log(state)
    obterlista();
  }, [])

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <BarraLateral />
        <PainelPrincipal listaCursos={listaCurso} nomeUsuario={state ? state.nome : ''} />
      </div>
    </div>


  );
}


