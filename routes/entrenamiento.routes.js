const { Router } = require('express')
const router = Router();
const { getEmociones,crearEntrenamiento,getEntrenamientos,getEntrenamientoPaciente } = require('../controllers/entrenamiento.controller');


router.get('/', getEmociones )
router.get('/paciente/:id', getEntrenamientoPaciente )
router.get('/lista', getEntrenamientos )
router.post('/', crearEntrenamiento )


module.exports =  router;