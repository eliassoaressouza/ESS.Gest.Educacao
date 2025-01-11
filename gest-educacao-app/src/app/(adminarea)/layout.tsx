'use client'

import { AppWrapper } from "@/context/AuthContext";

import { Toaster } from "@/components/ui/toaster";
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
      <section className="main-content w-full p-6 max-lg:ml-8">
      <Header nomeUsuario={state?state.nome:''} />
      <div className="mt-12 mb-6 px-2">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
      {children}
      </div>
      </div>
    </section>
    </div>
  </div>
  );
}
