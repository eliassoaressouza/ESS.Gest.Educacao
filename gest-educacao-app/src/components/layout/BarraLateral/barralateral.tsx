"use client"
import React, { useContext } from 'react';
import Image from 'next/image'
import { BookOpenText, House, NotebookPen } from 'lucide-react';
import { AppContext } from '@/context/AuthContext';
import { useRouter, } from 'next/navigation';
import { LogOut } from 'lucide-react';
import BarraItem from './BarraItem/barraitem';
import { PerfilAcessoEnum } from '@/dto/acesso/perfilacesso';
export default function BarraLateral() {
    const router = useRouter()
    const { logout, state } = useContext(AppContext);
    function logoutHandler() {

        logout();
        router.push('/');
    }
    return (
        <nav id="sidebar" className="lg:w-[270px] max-lg:fixed transition-all duration-500 shrink-0 z-[100]">
            <div id="sidebar-collapse-menu"
                className="bg-[#081028] shadow-lg h-screen fixed top-0 left-0 overflow-auto overflow-x-hidden z-[99] lg:w-[270px] max-lg:w-0 max-lg:invisible transition-all duration-500">
                <div className="bg-[#081028] flex items-center gap-4 pt-6 pb-2 px-4 sticky top-0 min-h-[64px] z-[100]">
                    <a href="javascript:void(0)" className="flex items-center gap-2">
                        <Image
                            src="/gelogo.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </a>
                    <button id="close-sidebar" className='ml-auto'>
                    </button>
                </div>

                <div className="py-4 px-4">

                    <ul className="space-y-2 mt-6">
                        <li>
                            {state?.PerfilAcesso == PerfilAcessoEnum.ALUNO ?
                                <BarraItem link="/home" label="Dashboard" icone={<House />} />
                                : <div></div>
                            }
                        </li>
                        <li>
                            {state?.PerfilAcesso == PerfilAcessoEnum.ADMINISTRADOR ?
                                <BarraItem link="/curso" label="Curso" icone={<BookOpenText />} />
                                : <div></div>
                            }
                        </li>
                        <li>
                            {state?.PerfilAcesso == PerfilAcessoEnum.ADMINISTRADOR ?
                                <BarraItem link="/matricula" label="Matricula" icone={<NotebookPen />} />
                                : <div></div>
                            }
                        </li>
                        <li>
                            <div onClick={logoutHandler} className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300">
                                <LogOut />
                                <span className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap">Sair</span>
                            </div>
                        </li>
                    </ul>
                    <hr className="border-gray-600 my-6" />
                </div>
            </div>
        </nav>
    );
}