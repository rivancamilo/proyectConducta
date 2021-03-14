const { Schema, model } = require('mongoose')

const PacienteSchema = Schema({
    pacienteNombres:    { type: String,     required:true, trim: true },
    pacienteApellidos:  { type: String,     required:true, trim: true },
    pacienteTipoID:     { type: String,     required:true, trim: true },
    pacienteNumID:      { type: String,     required:true, unique:true },
    pacienteDateNaci:   { type: String,     required:true, trim: true },
    pacienteEPS:        { type: String,     required:true, trim: true },
    pacienteCiudad:     { type: String,     required:true, trim: true },
    pacienteDireccion:  { type: String,     required:true, trim: true },
    pacienteEdad:       { type: String,     required:true, trim: true },
    pacienteFoto:       { type: String }
})


/**************************************************************************************** 
en esta parte lo que hacemos es quitar el artributo de userPassword 
para el obteto que retornamos pero aun asi sigue guardado en 
la base de datos todo esot con fines de seguridad  

****************************************************************************************/
PacienteSchema.methods.toJSON = function(){
    let paciente = this;
    let pacienteObject = paciente.toObject();
    delete pacienteObject.__v;
    return pacienteObject;
}
    



/* exportamos el modulo  */
module.exports = model('Pacientes', PacienteSchema);
