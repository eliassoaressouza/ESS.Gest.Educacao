import React from 'react';

export default function CadastroPage() {
  return (
    <>
      <div className="bg-[#c8cdd8]  p-6  rounded-lg overflow-hidden">
        <h4>cadastro de curso</h4>
      
      <form  >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Nome</label>
              <input type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
             
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Descrição</label>
              
              <input  type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
            </div>
          </div>
          <div className="!mt-12 space-x-4">
            <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Cadastrar
            </button>
          </div>
        </form>
        </div>
    </>
  );
}