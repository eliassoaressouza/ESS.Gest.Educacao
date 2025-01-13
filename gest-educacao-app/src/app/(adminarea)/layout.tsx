'use client'
import BarraLateral from "../../components/layout/BarraLateral/barralateral";
import { AppContext } from "@/context/AuthContext";
import { useContext } from "react";
import Header from "@/components/layout/Header/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { state } = useContext(AppContext);


  return (
  <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
    <div className="flex items-start">
      <BarraLateral />
      <section className="w-full p-6 max-lg:ml-8">
      <Header nomeUsuario={state?state.Nome:''} />
      {children}
    </section>
    </div>
  </div>
  );
}
