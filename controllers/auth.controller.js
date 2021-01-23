

const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcryptjs =  require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res=  response ) =>{

    const {  userEmail, userPassword } = req.body;

    try {
        /*******************************************************************************
        Validamos si existe un usuario con ese email
        *******************************************************************************/
        const usuarioDB = await Usuario.findOne({ userEmail })
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg:'usuario o contraseña no son validos'
            })
        }

        /*******************************************************************************
        Verificar contraseña 
        *******************************************************************************/
        const validaPass = bcryptjs.compareSync(userPassword, usuarioDB.userPassword );
        if( !validaPass ){ 
            return res.status(400).json({
                ok:false,
                msg:'usuario o contraseña no son validos'
            })
        }

        /*******************************************************************************
        Generamos el token
        *******************************************************************************/
        const token = await generarJWT( usuarioDB._id )


        res.json({
            ok:true,
            token
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado en el servidor'
        })

    }


}


const renewToken = async (req , res = response) =>  {

    const idUser = req.idUserToken;

    const usuario = await Usuario.findById(idUser);


    /*******************************************************************************
    Generamos el token
    *******************************************************************************/
    const token = await generarJWT( idUser )

    res.json({
        ok:true,
        token,
        usuario
    })

}



module.exports = {
    login,
    renewToken
}