const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    userNombres:    { type: String,     required:true },
    userApellidos:  { type: String,     required:true },
    userEmail:      { type: String,     required:true,  unique:true },
    userPassword:   { type: String,     required:true },
    userEstado:     { type: Boolean,    required:true },
    userRolID :     { type: String },
    userLastDate:   { type: String,     required:true },
    userDateAdd:    { type: String,     required:true },
    userContacto:   { type: String },
    userSobreMi:    { type: String },
    userAvatar:     { type: String },
})


/**************************************************************************************** 
en esta parte lo que hacemos es quitar el artributo de userPassword 
para el obteto que retornamos pero aun asi sigue guardado en 
la base de datos todo esot con fines de seguridad  

****************************************************************************************/
/* UsuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.userPassword;
    return userObject;
} */


/* exportamos el modulo  */
module.exports = mongoose.model('Usuarios', UsuarioSchema);
