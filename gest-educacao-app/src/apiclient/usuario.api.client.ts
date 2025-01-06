import { IUsuarioDTO } from "@/dto/usuario/usuario.dto";
import { apiService, ReturnInfo } from "./api.client";

export class UsuarioApiClient{

    async Salvar(usuario:IUsuarioDTO):Promise<ReturnInfo>{

        const respApi = await apiService.post('usuario', usuario);
        const data = await respApi.data;
        console.log('######################')
        console.log(data);
        return  data;  
    }

}