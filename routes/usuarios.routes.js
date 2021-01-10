const { Router } = require('express')
const { getUsuarios, crearUsuario,updateUsuario,deleteUsuario } = require('../controllers/usuarios.controller');
const router = Router();
const { check } = require('express-validator');
const { validaCampo } = require('../middlewares/validar-campos');

router.get('/', getUsuarios )
router.post('/', 
            [ 
                check('userNombres', 'El nombre es obligatorio').not().isEmpty(),
                check('userApellidos', 'los apellidos son obligatorios').not().isEmpty(),
                check('userEmail','el Email no es valido').isEmail(),
                check('userPassword', 'El password es obligatorio').not().isEmpty(),
                validaCampo
            ] , crearUsuario );
        
router.put('/:id', updateUsuario )

router.delete('/:id', deleteUsuario )

module.exports =  router;
