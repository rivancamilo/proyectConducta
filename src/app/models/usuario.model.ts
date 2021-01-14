export class Usuario {

    constructor(
        public userNombres : string,
        public userApellidos : string,
        public userEmail : string,
        public userEstado : boolean,
        public userRolID  : string,
        public userDateAdd : string,
        public userContacto : string,
        public userPassword? : string,
        public userSobreMi? : string,
        public userAvatar? : string
    ){

    }

}