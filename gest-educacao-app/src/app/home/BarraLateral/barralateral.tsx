import React from 'react';
import Image from 'next/image'

export default function BarraLateral() {
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
                        <p className="text-base font-semibold text-gray-300 tracking-wide">Dashboard</p>
                    </a>

                    <button id="close-sidebar" className='ml-auto'>

                    </button>
                </div>

                <div className="py-4 px-4">

                    <ul className="space-y-2 mt-6">
                        <li>
                            <a href="/home"
                                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-3"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                                        data-original="#000000" />
                                    <path
                                        d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                                        data-original="#000000" />
                                </svg>
                                <span className="overflow-hidden text-ellipsis whitespace-nowrap">Dashboard</span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="arrowIcon w-2.5 h-2.5 fill-current rotate-0 ml-auto transition-all duration-500"
                                    viewBox="0 0 451.847 451.847">
                                    <path
                                        d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                                        data-original="#000000" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href='/'>
                                <button type="button" className="py-3.5 px-8 text-sm font-semibold tracking-wider rounded-md text-white bg-green-400 hover:bg-green-600 focus:outline-none">
                                    Voltar
                                </button>
                            </a>
                        </li>
                    </ul>
                    <hr className="border-gray-600 my-6" />
                </div>
            </div>
        </nav>
    );
}