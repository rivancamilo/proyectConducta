const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req,res = response)=>{
    
    const desde = Number(req.query.desde) || 0 ;

    //ejecutamos ambas consultas al mismo tiempo
    const [usuario, total ] = await Promise.all([
        Usuario
                .find({})
                .skip(desde)
                .limit(5),

        Usuario.countDocuments()

    ])
   

    res.json({
        ok:true,
        usuario,
        total,
        id:req.idUserToken // id del usuario que hizo la peticion
    })

}

const crearUsuario = async (req,res = response ) =>{
    
    const { userNombres,
            userApellidos,
            userEmail,
            userPassword,
            userEstado,
            userRolID ,
            userDateAdd,
            userContacto,
            userSobreMi,
            userAvatar } = req.body;

        

    try {

        /**************************************************************************
        validamos que el usuario no este ya registrado con el mismo correo
        **************************************************************************/
        const existeEmail = await Usuario.findOne({ userEmail });
        if( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body)
        /**************************************************************************
        encriptamos la contraseña en una sola via
        **************************************************************************/
        const salt = bcryptjs.genSaltSync();//generamos una cadena aleatoria
        usuario.userPassword = bcryptjs.hashSync( userPassword,salt )

        /**************************************************************************
        guardamos el usuario
        **************************************************************************/
        await usuario.save();
        
        /*******************************************************************************
        Generamos el token
        *******************************************************************************/
        const token = await generarJWT( usuario._id )

        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'error inesperado, revisar los logs'
        })

    }  

}


const updateUsuario = async (req, res = response ) => {

    const idUser = req.params.id;
    try {
        
        const usuarioDB = await Usuario.findById(idUser)
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no esta registrado'
            })
        }
        
        //realizamos la actualizaciones de los datos menos el email
        const {userEmail, ...campos} = req.body;
        //delete campos.userEmail;// eliminamos el campo de email ya que no se podra actualizar
        const usuarioActualizado = await Usuario.findByIdAndUpdate(idUser,campos, { new:true })

        res.json({
            ok:true,
            usuario:usuarioActualizado
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })
    }
}


const deleteUsuario = async (req, res = response ) =>{
    
    const idUser = req.params.id;

    try {
        /*********************************************************************
        buscamos el usuario a eliminar
        *********************************************************************/
        const usuarioDB = await Usuario.findById(idUser)
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no esta registrado'
            })
        }

        const usuarioDelete = await Usuario.findOneAndDelete(idUser)

        res.json({
            ok:true,
            msg:'Usuario eliminado'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }
}


module.exports= {
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}