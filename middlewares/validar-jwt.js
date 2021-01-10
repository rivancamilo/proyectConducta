const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next )=>{

    // leer el token
    const token = req.header('x-token');
    /*******************************************************************
    Validamos que el usuario envie un token
    *******************************************************************/
    if( !token ){
        return res.status(401).json({
            ok:false,
            msg:'No hay un token en la peticion'
        })
    }
    

    try {

        //varificamos el token del usuario
        const { id } = jwt.verify(token, process.env.JWT_SECRET )
        
        //creamos una variable en el req donde guardamos el id del usuario
        req.idUserToken = id;

    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

    next();

}


module.exports = {
    validarJWT
}