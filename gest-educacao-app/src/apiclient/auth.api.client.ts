import { AxiosError } from "axios";
import { apiService } from "./api.client";
import { AuthData, AuthRefresh } from "@/dto/auth/authdata.dto";
import { AuthReturn } from "@/dto/auth/auth.return";


export class AuthApiClient {

    async login(data: AuthData): Promise<AuthReturn> {

        try {
            const respApi = await apiService.post('conta/login', data);
            const dataResp = await respApi.data;
            return dataResp as AuthReturn;
        } catch (error: AxiosError | any) {
            return error.response.data as AuthReturn
        }
    }
    async refresh(authRefresh: AuthRefresh): Promise<AuthReturn> {

        try {
            const respApi = await apiService.post('conta/refresh',authRefresh);
            const dataResp = await respApi.data;
            return dataResp as AuthReturn;

        } catch (error: AxiosError | any) {
            return error.response.data as AuthReturn
        }
    }
     parseJwt(token: string) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    

}