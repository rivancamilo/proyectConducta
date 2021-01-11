const { Router } = require('express')
const router = Router();
const { check } = require('express-validator');
const { validaCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { getPacientes, crearPacientes, updatePacientes, deletePacientes} = require('../controllers/paciente.controllers');

router.get('/', getPacientes )
router.post('/', 
            [ 
            ] , crearPacientes );
        
router.put('/:id', updatePacientes )

router.delete('/:id', deletePacientes )

module.exports =  router;