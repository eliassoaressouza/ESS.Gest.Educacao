
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function Login() {
  const router = useRouter()
  
  const usuarioShema = z.object({
    email: z.string().min(3),
    senha: z.string()
  });
  const { register, handleSubmit } = useForm<UsuarioLoginShema>(
    { resolver: zodResolver(usuarioShema) }
  );
  type UsuarioLoginShema = z.infer<typeof usuarioShema>
  function loginPass(data: UsuarioLoginShema) {
    console.log(data)
    //router.push('/home/DashBoard');
  }
  function novaConta() {
    router.push('/acesso/NovaConta');
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form onSubmit={handleSubmit(loginPass)}  >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input type="password" {...register('senha')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <Button type="submit" className="mb-6 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600" > Entrar </Button>

        </form>
        <a href="/acesso/NovaConta">
          <Button type="button" className="w-full px-4 py-2 bg-green-400 text-white font-medium rounded-md hover:bg-green-500" > Criar Nova Conta </Button>
        </a>
      </div>
    </div>


  );
}
