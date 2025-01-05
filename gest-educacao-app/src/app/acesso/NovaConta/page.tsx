
'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export default function NovaContaPage() {
  const usuarioShema = z.object({
    nome: z.string().nonempty('Obrigatório campo nome!'),
    email: z.string().min(3),
    senha: z.string(),
    confirmSenha: z.string()
  });
  const { register,
    handleSubmit,
    formState: { errors } } = useForm<CreateUserFormData>(
      { resolver: zodResolver(usuarioShema) }
    );
  type CreateUserFormData = z.infer<typeof usuarioShema>
  function cadastroPass(data: CreateUserFormData) {
    console.log(data)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-16">
          <Image
            src="/gelogo.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <h4 className="text-gray-800 text-base font-semibold mt-6">Registre sua conta</h4>
        </div>

        <form onSubmit={handleSubmit(cadastroPass)} >
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Nome</label>
              <input {...register('nome')} type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
              {errors.nome?<span>{errors.nome.message}</span>:<></>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input {...register('email')} type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Senha</label>
              <input {...register('senha')} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Senha</label>
              <input  {...register('confirmSenha')} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
            </div>
          </div>

          <div className="!mt-12">
            <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Sign up
            </button>
          </div>
        </form>
      </div>

    </>);
}