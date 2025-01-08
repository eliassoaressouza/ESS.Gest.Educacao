import { AxiosError } from "axios";
import { apiService } from "./api.client";
import { AuthData } from "@/dto/auth/authdata.dto";
import { AuthReturn } from "@/dto/auth/auth.return";

export class AuthApiClient {

    async login(data: AuthData): Promise<AuthReturn> {

        try {
            const respApi = await apiService.post('login', data);
            const dataResp = await respApi.data;
            return dataResp as AuthReturn;
        } catch (error:AxiosError|any ) {
            return error.response.data as AuthReturn
        }
    }

}