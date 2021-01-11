const { Schema, model } = require('mongoose')

const PacienteSchema = Schema({
    pacienteNombres:    { type: String,     required:true },
    pacienteApellidos:  { type: String,     required:true },
    pacienteTipoID:     { type: String,     required:true },
    pacienteNumID:      { type: String,     required:true, unique:true },
    pacienteDateNaci:   { type: String,     required:true },
    pacienteEPS:        { type: String,     required:true },
    pacienteCiudad:     { type: String,     required:true },
    pacienteDireccion:  { type: String,     required:true },
    pacienteEdad:       { type: String,     required:true },
    pacienteFoto:       { type: String },
    //usuario:            { type: Schema.Types.ObjectId, ref:'Usuarios'}
    
}, { collections: 'pacientes' })


/**************************************************************************************** 
en esta parte lo que hacemos es quitar el artributo de userPassword 
para el obteto que retornamos pero aun asi sigue guardado en 
la base de datos todo esot con fines de seguridad  

****************************************************************************************/
PacienteSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.__v;
    return userObject;
}
    



/* exportamos el modulo  */
module.exports = model('Pacientes', PacienteSchema);
