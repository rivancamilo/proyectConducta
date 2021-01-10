const { response } = require('express');
const { validationResult } = require('express-validator');
/****************************************************************
validamos que no hayan errores o campos vacios
****************************************************************/
const validaCampo = (req, res = response, next )=>{

    //obtenemos los eerores del req
    const errores = validationResult( req );

    if( !errores.isEmpty() ){ 
        return res.status(400).json({
            ok:false,
            msg:errores.mapped()
        })
    }

    next();

}

module.exports = {
    validaCampo
}