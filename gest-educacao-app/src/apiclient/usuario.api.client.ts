import { IUsuarioDTO } from "@/dto/usuario/usuario.dto";
import { apiService } from "./api.client";

export class UsuarioApiClient{

    async Salvar(usuario:IUsuarioDTO):Promise<number>{

        const respApi = await apiService.post('usuario', usuario);
        const data = await respApi.data;
        return  data;  
    }
}