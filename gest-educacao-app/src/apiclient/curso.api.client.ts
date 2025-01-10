
import { apiService } from "./api.client";
import { ReturnInfo } from "@/dto/api.client/return.info";

export class CursoApiClient {

    async ObterLista(idusuario:number): Promise<ReturnInfo> {
        let returnInfo: ReturnInfo;
        const respApi = await apiService.get(`curso?idusuario=${idusuario}`);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }

}