
'use client'
import { UsuarioApiClient } from '@/apiclient/usuario.api.client';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation'
export default function NovaContaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const usuarioShema = z.object({
    nome: z.string().nonempty('Obrigatório campo nome!'),
    email: z.string().min(3, 'minimo 3 caracteres'),
    senha: z.string().nonempty('Obrigatório campo senha!'),
    confirmSenha: z.string()
  }).superRefine(({ confirmSenha, senha }, ctx) => {
    if (confirmSenha !== senha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não combinam",
        path: ['confirmSenha']
      });
    }
  });
  const { register,
    handleSubmit,
    formState: { errors } } = useForm<CreateUserFormData>(
      { resolver: zodResolver(usuarioShema) }
    );
  type CreateUserFormData = z.infer<typeof usuarioShema>

  async function cadastroPass(data: CreateUserFormData) {
    let resp = new UsuarioApiClient().Salvar({ Email: data.email, Nome: data.nome, Senha: data.senha });
    var retorno = await resp;

    if (retorno.status) {
      toast({
        title: "GEST-EDUCAÇÃO",
        description: retorno.message,
      });
      router.push('/')
    }
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
              {errors.nome ? <span>{errors.nome.message}</span> : <></>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input {...register('email')} type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
              {errors.email ? <span>{errors.email.message}</span> : <></>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Senha</label>
              <input {...register('senha')} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
              {errors.senha ? <span>{errors.senha.message}</span> : <></>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Senha</label>
              <input  {...register('confirmSenha')} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
              {errors.confirmSenha ? <span>{errors.confirmSenha.message}</span> : <></>}
            </div>
          </div>
          <div className="!mt-12">
            <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>);
}