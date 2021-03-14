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
                .sort({_id:'desc'})
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

const getUsuario = async (req,res = response) =>{

    const id = req.params.id;
    //ejecutamos ambas consultas al mismo tiempo
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        return res.status(500).json({
            ok:false,
            usuario: "Error no existe",
        });
    }
        
    res.json({
        ok:true,
        usuario,
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

        //extraemos los datos del body 
        const {  userPassword, formulario, ...campos } = req.body;

        if( formulario === 'usuario' ){

            /**************************************************************************
            encriptamos la contraseña en una sola via
            **************************************************************************/
            const salt = bcryptjs.genSaltSync();//generamos una cadena aleatoria
            const passwordEncript = bcryptjs.hashSync( userPassword, salt )
            const datos = {
                userPassword:passwordEncript,
                ...campos
            }
            console.log(datos);
            const usuarioActualizado = await Usuario.findByIdAndUpdate(idUser,datos, { new:true, useFindAndModify: false })
            res.json({
                ok:true,
                usuario:usuarioActualizado
            })

        }else{

            const { formulario,...datos2 } = req.body;
            const usuarioActualizado2 = await Usuario.findByIdAndUpdate(idUser,datos2, { new:true, useFindAndModify: false })
            res.json({
                ok:true,
                usuario:usuarioActualizado2
            })
        }

        

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
    console.log('Usuario a Eliminar',idUser)
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


const validaPassActual = async ( req, res = response )=>{

    const idUser = req.params.id;
    console.log(idUser)
    console.log(req.body)
    const {  passActual } = req.body;

    try {
        /*******************************************************************************
        Validamos si existe un usuario con ese id
        *******************************************************************************/
        const usuarioDB = await Usuario.findById(idUser)
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no se encontro'
            })
        }

        /*******************************************************************************
        Verificar contraseña 
        *******************************************************************************/
        const validaPass = bcryptjs.compareSync(passActual, usuarioDB.userPassword );
        if( !validaPass ){ 
            return res.json({
                ok:false,
                msg:'usuario o contraseña no son validos'
            })
        }

        res.json({
            ok:true,
            msg:'password valido'
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }
}


const cambiarPassword = async ( req, res = response) => {
    
    const idUser = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById(idUser)
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no esta registrado'
            })
        }

        //extraemos los datos del body 
        const {  userPassword } = req.body;
        /**************************************************************************
        encriptamos la contraseña en una sola via
        **************************************************************************/
        const salt = bcryptjs.genSaltSync();//generamos una cadena aleatoria
        const passwordEncript = bcryptjs.hashSync( userPassword, salt )
        const datos = { userPassword:passwordEncript }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(idUser,datos, { new:true, useFindAndModify: false })
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

module.exports= {
    getUsuarios,
    getUsuario,
    crearUsuario,
    updateUsuario,
    deleteUsuario,
    validaPassActual,
    cambiarPassword
}