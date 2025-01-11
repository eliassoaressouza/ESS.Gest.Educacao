
"use client"
import { AppContext } from "@/context/AuthContext";
import { useContext } from "react";
import ListaCursos from "../curso/ListaCursos/listacursos";

export default function Home() {
  const {  listaCurso } = useContext(AppContext);

  return (
    <>
       <ListaCursos listaCursos={listaCurso} />
    </>

  );
}


