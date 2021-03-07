const { Schema, model } = require('mongoose')

const EntrenamientoSchema = Schema({
    paciente:{
        type:Schema.Types.ObjectId,
        ref:'Pacientes',
        required:true
    },
    dateAplicacion:{ type: String },
    totalPromeM1Fase1:{ type:Number },
    totalPromeM2Fase1:{ type:Number },
    totalPromeFase1:{ type:Number },
    promedioM1Fase2:{ type:Number },
    promedioM2Fase2:{ type:Number },
    totalPromeFase2:{ type:Number },
    totalPromeFase3:{ type:Number },
    totalEntrenamiento:{ type:Number },
    instruccionVerbal:{
        diversion:{ type: String },
        emocion:{ type: String }, 
        orgullologros:{ type: String },
        satisfaccion:{ type: String },
        tristeza:{ type: String }, 
        alegria :{ type: String },
        miedo:{ type: String },
        enojo:{ type: String }, 
        desagrado:{ type: String },
        sorpresa:{ type: String }
    },
    expresionFacial: {
        diversion:{ type: String },
        emocion:{ type: String }, 
        orgullologros:{ type: String },
        satisfaccion:{ type: String },
        tristeza:{ type: String }, 
        alegria :{ type: String },
        miedo:{ type: String },
        enojo:{ type: String }, 
        desagrado:{ type: String },
        sorpresa:{ type: String }
    },
    selectEmocion: {
        diversion:{ type: String },
        emocion:{ type: String }, 
        orgullologros:{ type: String },
        satisfaccion:{ type: String },
        tristeza:{ type: String }, 
        alegria :{ type: String },
        miedo:{ type: String },
        enojo:{ type: String }, 
        desagrado:{ type: String },
        sorpresa:{ type: String }
    },
    f2CheckObserPm:{ type: Boolean },
    f2ValEmocionManifesPm:{ type: String },
    f2ObservacionManifesPm:{ type: String },
    f2ValRelatoPm:{ type: String },
    f2ObservacionRelatoPm:{ type: String },

    f2CheckObserSm:{ type: Boolean },
    f2ValEmocionIndicadaSm:{ type: String },
    f2ObservacionEmocionIndicadaSm:{ type: String },
    f2ValImitacionSm:{ type: String },
    f2ObservacionImitacionSm:{ type: String },
    expresionEmocionVcotidiana:{
        diversion:{ type: String },
        emocion:{ type: String }, 
        orgullologros:{ type: String },
        satisfaccion:{ type: String },
        tristeza:{ type: String }, 
        alegria :{ type: String },
        miedo:{ type: String },
        enojo:{ type: String }, 
        desagrado:{ type: String },
        sorpresa:{ type: String }
    },
    estado:{ type: Boolean },


}, { collections: 'entrenamientos' })



EntrenamientoSchema.methods.toJSON = function(){
    let entrenamiento = this;
    let entrenamientoObject = entrenamiento.toObject();
    delete entrenamientoObject.__v;
    return entrenamientoObject;
}
    



/* exportamos el modulo  */
module.exports = model('Entrenamientos', EntrenamientoSchema);