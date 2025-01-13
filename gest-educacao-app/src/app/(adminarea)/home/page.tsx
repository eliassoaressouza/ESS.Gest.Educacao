
"use client"
import { AppContext } from "@/context/AuthContext";
import { useContext } from "react";
import Dashboard from "./Dashboard/dashboard";


export default function Home() {
  const {  listaCurso } = useContext(AppContext);

  return (
    <>
       <Dashboard listaCursos={listaCurso} />
    </>

  );
}


