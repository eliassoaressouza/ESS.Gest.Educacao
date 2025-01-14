import { ReturnInfo } from "@/dto/api.client/return.info";
import { IMatriculaDTO } from "@/dto/matricula/matricula.dto";
import { apiService } from "./api.client";

export class MatriculaApiClient {

    async Salvar(matricula: IMatriculaDTO): Promise<ReturnInfo> {

        const respApi = await apiService.post('matricula', matricula);
        return  await respApi.data;
    }
}