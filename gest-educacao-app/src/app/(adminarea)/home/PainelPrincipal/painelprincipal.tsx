import { ICursoDTO } from '@/dto/curso/curso.dto';
import React from 'react';
import ListaCursos from '@/app/(adminarea)/curso/ListaCursos/listacursos';

export default function PainelPrincipal(props: { nomeUsuario: string, listaCursos: ICursoDTO[] }) {
  return (
    <section className="main-content w-full p-6 max-lg:ml-8">
      <div>
        <div className="flex items-center flex-wrap gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Bem vindo ,{props.nomeUsuario}</h3>
          </div>
          <div className="ml-auto">
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-6 px-2">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          <ListaCursos listaCursos={props.listaCursos} />
        </div>
      </div>
    </section>
  );
}