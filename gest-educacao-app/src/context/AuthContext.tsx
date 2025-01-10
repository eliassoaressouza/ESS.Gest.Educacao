
"use client"
import { AuthApiClient } from "@/apiclient/auth.api.client";
import { ReturnInfo } from "@/dto/api.client/return.info";
import { AuthData } from "@/dto/auth/authdata.dto";
import { IUsuarioDTO } from "@/dto/usuario/usuario.dto";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ChaveCokie } from "./ChaveCokie";



export type Context = {
    state: IUsuarioDTO | null,
    isAuth: boolean,
    loginAuth: (data: AuthData) => Promise<ReturnInfo>,
    logout: () => void,
};
export const AppContext = createContext<Context>({} as Context);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<IUsuarioDTO | null>(null);
    const isAuth = !!state;

    function logout() {
        setState(null);
        destroyCookie(null, 'gest-educacao-token')
    }

    async function loginAuth({ Email, Senha }: AuthData): Promise<ReturnInfo> {
        var loginResp = await new AuthApiClient().login({ Email, Senha });
        //armazenar o token
        let resp = loginResp.returnInfo;
        if (resp.status) {
            setCokkie(loginResp.token);
            setState(resp.item as IUsuarioDTO);
        }
        return resp;
    }
    //refreshToken
    const refreshToken = useCallback(async (token: string) => {
        var refreshResp = await new AuthApiClient().refresh({ Token: token });
        let resp = refreshResp.returnInfo;
        if (resp.status) {
            setState(resp.item as IUsuarioDTO);
        }
    }, []);


    function setCokkie(token: string) {
        setCookie(undefined, ChaveCokie, token,
            {
                maxAge: 60 * 60 * 2 //2 horas
            });
    }

    useEffect(() => {

        const { 'gest-educacao-token': token } = parseCookies();

        if (token) {
            //refreshToken
            refreshToken(token);


            //atualizar informações do usuario
            // console.log('token!!!');
            // let tokenobj = parseJwt(token);
            // const nome: string = tokenobj.unique_name;
            // setState({ nome: 'Elias', email: '', id: 0, senha: '' })

        }


    }, []);

    return (

        <AppContext.Provider value={{ state, isAuth, loginAuth, logout }}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    return useContext(AppContext);
}