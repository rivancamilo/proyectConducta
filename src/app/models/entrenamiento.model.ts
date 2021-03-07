export class Entrenamiento {

    constructor(
    
        public paciente:{
            _id: string,
            pacienteEdad: string,
            pacienteNombres: string,
            pacienteApellidos: string,
            pacienteFoto: string
        },
        public dateAplicacion:string,
        public totalPromeM1Fase1:string,
        public totalPromeM2Fase1:string,
        public totalPromeFase1:string,
        public promedioM1Fase2:string,
        public promedioM2Fase2:string,
        public totalPromeFase2:string,
        public totalPromeFase3:string,
        public totalEntrenamiento:string,
        public instruccionVerbal:{
            diversion:string,
            emocion:string, 
            orgullologros:string,
            satisfaccion:string,
            tristeza:string, 
            alegria :string,
            miedo:string,
            enojo:string, 
            desagrado:string,
            sorpresa:string
        },
        public expresionFacial: {
            diversion:string,
            emocion:string, 
            orgullologros:string,
            satisfaccion:string,
            tristeza:string, 
            alegria :string,
            miedo:string,
            enojo:string, 
            desagrado:string,
            sorpresa:string
        },
        public selectEmocion: {
            diversion:string,
            emocion:string, 
            orgullologros:string,
            satisfaccion:string,
            tristeza:string, 
            alegria :string,
            miedo:string,
            enojo:string, 
            desagrado:string,
            sorpresa:string
        },
        public f2CheckObserPm:boolean,
        public f2ValEmocionManifesPm:string,
        public f2ObservacionManifesPm:string,
        public f2ValRelatoPm:string,
        public f2ObservacionRelatoPm:string,
    
        public f2CheckObserSm:boolean,
        public f2ValEmocionIndicadaSm:string,
        public f2ObservacionEmocionIndicadaSm:string,
        public f2ValImitacionSm:string,
        public f2ObservacionImitacionSm:string,
        public expresionEmocionVcotidiana:{
            diversion:string,
            emocion:string, 
            orgullologros:string,
            satisfaccion:string,
            tristeza:string, 
            alegria :string,
            miedo:string,
            enojo:string, 
            desagrado:string,
            sorpresa:string
        },
        public estado:boolean

    ){

    }

    
}