const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { actualizarAvatar } = require('../helpers/actualizar-avatar')

const fileUpload = (req, res = response ) => {
    const id = req.params.id;
    const tabla = req.params.tabla

    const tiposValidos = ['usuarios','pacientes'];
    //validamos el tipo de tabla
    if( !tiposValidos.includes(tabla) ){
        res.status(400).json({
            ok:false,
            msg:'No es un usuario u paciente'
        })
    }

    //validamos que exista un archivo de imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
    }

    //procesamos la imagen
    const file = req.files.avatar;
    const nomCortado = file.name.split('.');
    const extencion = nomCortado[nomCortado.length -1];//extencion de la imagen con que se subio 
    //validamos que sea una extencion valida
    const extencionValidas = ['png','jpg','jpeg','gif']
    if( !extencionValidas.includes( extencion ) ){
        res.status(400).json({
            ok:false,
            msg:'No es un formato de imagen valido'
        })
    }
    //generamos el nombre del archivo
    const nomArchivo = `${ uuidv4() }.${extencion}`;
    //path para guardar la imagen
    const path = `./uploads/${tabla}/${nomArchivo}`

    // movemos la imagen
    file.mv( path , (err) => {
        
        if (err){
            return res.status(500).json({
                ok:false,
                msg:'Error, al mover la imagen'
            })
        }

        //actualizamos la Base de datos
        
        actualizarAvatar( tabla, id, nomArchivo );


        res.json({
            ok:true,
            msg:`archivo subido`,
            nombreArchivo: nomArchivo
        })
        
    });

}


const retornaAvatar = (req, res = response) => {

    const tabla = req.params.tabla
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/${tabla}/${foto}`);
    //imagen por defecto
    if( fs.existsSync(pathImagen) ){
        res.sendFile(pathImagen)
    }else{
        const pathImagen = path.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImagen)
    }

}

module.exports = {
    fileUpload,
    retornaAvatar
}