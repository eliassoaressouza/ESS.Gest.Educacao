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

}