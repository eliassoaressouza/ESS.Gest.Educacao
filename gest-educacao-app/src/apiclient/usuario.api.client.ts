import { IUsuarioDTO, IUsuarioSalvarDTO } from "@/dto/usuario/usuario.dto";
import { apiService } from "./api.client";
import { ReturnInfo } from "@/dto/api.client/return.info";

export class UsuarioApiClient {

    async Salvar(usuario: IUsuarioSalvarDTO): Promise<ReturnInfo> {
        let returnInfo: ReturnInfo;
        const respApi = await apiService.post('usuario', usuario);
        const data = await respApi.data;
        returnInfo = data;
        return returnInfo;
    }
    async ObterListaTodos(): Promise<ReturnInfo> {
        const respApi = await apiService.get(`usuario`);
        return await respApi.data;
    }
    async ObterListaUsuarioCursos(): Promise<ReturnInfo> {
        const respApi = await apiService.get(`usuario/listarusuariocursos`);
        return await respApi.data;
    }
    async ObterListaAlunos(): Promise<ReturnInfo> {
        const respApi = await apiService.get(`usuario/listaralunos`);
        return await respApi.data;
    }

}