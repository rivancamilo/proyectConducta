const { Router } = require('express')
const { getUsuarios, crearUsuario,updateUsuario,deleteUsuario } = require('../controllers/usuarios.controller');
const router = Router();
const { check } = require('express-validator');
const { validaCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

router.get('/', validarJWT ,getUsuarios )
router.post('/', 
            [ 
                validarJWT,//validamos el token
                check('userNombres', 'El nombre es obligatorio').not().isEmpty(),
                check('userApellidos', 'los apellidos son obligatorios').not().isEmpty(),
                check('userEmail','el Email no es valido').isEmail(),
                check('userPassword', 'El password es obligatorio').not().isEmpty(),
                validaCampo
            ] , crearUsuario );
        
router.put('/:id',validarJWT, updateUsuario )

router.delete('/:id', validarJWT ,deleteUsuario )

module.exports =  router;
