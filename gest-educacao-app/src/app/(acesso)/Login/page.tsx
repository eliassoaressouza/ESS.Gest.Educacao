
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { IUsuarioDTO } from '@/dto/usuario/usuario.dto';
import { PerfilAcessoEnum } from '@/dto/acesso/perfilacesso';

export function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const { loginAuth } = useAppContext();
  const usuarioShema = z.object({
    email: z.string().min(3),
    senha: z.string()
  });
  const { register, handleSubmit } = useForm<UsuarioLoginShema>(
    { resolver: zodResolver(usuarioShema) }
  );
  type UsuarioLoginShema = z.infer<typeof usuarioShema>

  async function loginPass(data: UsuarioLoginShema) {
    let retorno = await loginAuth({ Email: data.email, Senha: data.senha });

    if (!retorno.Status) {
      toast({
        title: "GEST-EDUCAÇÃO",
        description: retorno.Message,
      });
      return;
    }
    const usuario = retorno.Item as IUsuarioDTO
    if (usuario.PerfilAcesso == PerfilAcessoEnum.ALUNO) {
      router.push('/home');
    }else if(usuario.PerfilAcesso == PerfilAcessoEnum.ADMINISTRADOR){
      router.push('/curso');
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
                                      src="/gelogo.png"
                                      width={50}
                                      height={50}
                                      alt="logo"
                                  />
          Gestão Educação
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Entre na sua conta
            </h1>
            <form onSubmit={handleSubmit(loginPass)} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" {...register('email')} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@email.com" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <input type="password" {...register('senha')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">Lembre-me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <Button type="submit" className="mb-6 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600" > Entrar </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ainda não tem uma conta? <a href="/NovaConta" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Criar Nova Conta</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>


  );
}
