
"use client"
import { AppContext } from "@/context/AuthContext";
import { useContext } from "react";
import BarraLateral from "./BarraLateral/barralateral";
import PainelPrincipal from "./PainelPrincipal/painelprincipal";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <BarraLateral />
        <PainelPrincipal  nomeUsuario={state? state.nome:''} />
      </div>
    </div>


  );
}