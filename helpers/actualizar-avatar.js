const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Paciente = require('../models/paciente.model');

const borrarImagen = ( path ) => {

    if( fs.existsSync(path) ){
        fs.unlinkSync( path ) //eliminamos la imagen anterior
    }
}


const actualizarAvatar = async ( tabla, id, nomArchivo ) => {
    
    let pathViejo = '';

    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if( !usuario ){
                return false;
            }
            
            //validamos si ya tiene una imagen 
            pathViejo = `./uploads/usuarios/${ usuario.userAvatar }`;
            borrarImagen( pathViejo );

            usuario.userAvatar = nomArchivo;
            await usuario.save();

            return true;

            break;
        case 'pacientes':
            
            const paciente = await Paciente.findById(id)
            if( !paciente ){
                return false;
            }
            
            //validamos si ya tiene una imagen 
            pathViejo = `./uploads/pacientes/${ paciente.pacienteFoto }`;
            borrarImagen( pathViejo );

            paciente.pacienteFoto = nomArchivo;
            await paciente.save();

            return true;

            break;

    }

}


module.exports = {
    actualizarAvatar
}


