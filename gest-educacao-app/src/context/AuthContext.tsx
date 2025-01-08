
"use client"
import { AuthApiClient } from "@/apiclient/auth.api.client";
import { ReturnInfo } from "@/dto/api.client/return.info";
import { AuthData } from "@/dto/auth/authdata.dto";
import { IUsuarioDTO } from "@/dto/usuario/usuario.dto";
import { setCookie, parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { ChaveCokie } from "./ChaveCokie";


export type Context = {
    state: IUsuarioDTO | null,
    isAuth: boolean,
    loginAuth: (data: AuthData) => Promise<ReturnInfo>
};
export const AppContext = createContext<Context>({} as Context);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<IUsuarioDTO | null>(null);
    const isAuth = !!state;
    async function loginAuth({ Email, Senha }: AuthData): Promise<ReturnInfo> {
        var loginResp = await new AuthApiClient().login({ Email, Senha });
        //armazenar o token
        let resp = loginResp.returnInfo;
        if (resp.status) {

            setCookie(undefined, ChaveCokie, loginResp.token,
                {
                    maxAge: 60 * 60 * 2 //2 horas
                });
            setState(resp.item as IUsuarioDTO);
        }
        return resp;
    }

    useEffect(() => {
        const { ChaveCokie: token } = parseCookies();

        if (token) {
            //atualizar informações do usuario
            console.log('token!!!');
            console.log(token)
        }


    }, []);

    return (

        <AppContext.Provider value={{ state, isAuth, loginAuth }}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    return useContext(AppContext);
}