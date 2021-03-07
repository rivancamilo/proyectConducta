const { Router } = require('express')
const { getUsuarios, getUsuario , crearUsuario,updateUsuario,deleteUsuario,validaPassActual,cambiarPassword } = require('../controllers/usuarios.controller');
const router = Router();
const { check } = require('express-validator');
const { validaCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

router.get('/', validarJWT ,getUsuarios ); //Listamos todos los Usuarios
router.get('/:id', validarJWT, getUsuario ); // Listamos solo un Usuario

router.post('/valida/:id', validarJWT, validaPassActual)

router.post('/cambiopass/:id', validarJWT, cambiarPassword)

/* router.post('/', 
            [ 
                validarJWT,//validamos el token
                check('userNombres', 'El nombre es obligatorio').not().isEmpty(),
                check('userApellidos', 'los apellidos son obligatorios').not().isEmpty(),
                check('userEmail','el Email no es valido').isEmail(),
                check('userPassword', 'El password es obligatorio').not().isEmpty(),
                validaCampo
            ] , crearUsuario ); */


router.post('/', crearUsuario );//Caremoa un nuevo usuario
        
router.put('/:id',validarJWT, updateUsuario )//Actualizamos los datos de un Usuario

router.delete('/:id', validarJWT ,deleteUsuario )//

module.exports =  router;
