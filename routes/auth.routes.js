/*
    /api/login
*/

const { Router } = require('express')
const { check } = require('express-validator');

const router = Router();
const { login, renewToken } = require('../controllers/auth.controller');
const { validaCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/', 
            [
                check('userEmail','el Email no es valido').isEmail(),
                check('userPassword', 'El password es obligatorio').not().isEmpty(),
                validaCampo
            ]
            ,login )

router.get('/renewtoken', validarJWT , renewToken )



module.exports = router;