import { environment } from "src/environments/environment"


const base_url = environment.base_url;

export class Usuario {

    constructor(
        
        public userNombres : string,
        public userApellidos : string,
        public userEmail : string,
        public userEstado : string,
        public userRolID  : string,
        public userDateAdd : string,
        public userContacto : string,
        public userPassword? : string,
        public userSobreMi? : string,
        public userAvatar? : string,
        public _id? : string,
    ){

    }

    get getImagen(){
        // http://localhost:3800/api/upload/usuarios/5ffb6522a6303a183c79d969
        if( this.userAvatar ){
            return `${base_url}upload/usuarios/${this.userAvatar}`;
        }else{
            return `${base_url}upload/usuarios/no-imagen`;
        }
    }


    
}