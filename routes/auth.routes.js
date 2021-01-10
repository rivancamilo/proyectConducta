const { Router } = require('express')
const { check } = require('express-validator');

const router = Router();
const { login } = require('../controllers/auth.controller');
const { validaCampo } = require('../middlewares/validar-campos');

router.post('/', 
            [
                check('userEmail','el Email no es valido').isEmail(),
                check('userPassword', 'El password es obligatorio').not().isEmpty(),
                validaCampo
            ]
            ,login )



module.exports = router;