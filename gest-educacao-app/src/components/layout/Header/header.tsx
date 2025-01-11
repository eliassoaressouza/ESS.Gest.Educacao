import React from 'react';

export default function Header(props:{nomeUsuario:string}){
  return (
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
  );
}