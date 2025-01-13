
import { ICursoDTO } from "@/dto/curso/curso.dto";
import { apiService } from "./api.client";
import { ReturnInfo } from "@/dto/api.client/return.info";

export class CursoApiClient {

    async ObterLista(idusuario: number): Promise<ReturnInfo> {
        let returnInfo: ReturnInfo;
        const respApi = await apiService.get(`curso?idusuario=${idusuario}`);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }
    async ObterListaTodos(): Promise<ReturnInfo> {
        let returnInfo: ReturnInfo;
        const respApi = await apiService.get(`curso/listartodos`);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }
    async Salvar(curso: ICursoDTO): Promise<ReturnInfo> {
        let returnInfo: ReturnInfo;
        const respApi = await apiService.post('curso', curso);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }
    async Excluir(IdCurso:number): Promise<ReturnInfo> {
        
        let returnInfo: ReturnInfo;
        const respApi = await apiService.delete(`curso?IdCurso=${IdCurso}`);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }

}