import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Paciente {

    constructor(
        public pacienteNombres: string,
        public pacienteApellidos: string,
        public pacienteTipoID: string,
        public pacienteNumID: string,
        public pacienteDateNaci: string,
        public pacienteEPS: string,
        public pacienteCiudad: string,
        public pacienteDireccion: string,
        public pacienteEdad: string,
        public pacienteFoto: string
    ) {

    }

    get getImagen(){
        // http://localhost:3800/api/upload/usuarios/5ffb6522a6303a183c79d969
        if( this.pacienteFoto ){
            return `${base_url}upload/pacientes/${this.pacienteFoto}`;
        }else{
            return `${base_url}upload/pacientes/no-imagen`;
        }
    }
}









