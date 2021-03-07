const { Router } = require('express')
const router = Router();
const { getEmociones,crearEntrenamiento,getEntrenamientos } = require('../controllers/entrenamiento.controller');


router.get('/', getEmociones )
router.get('/lista', getEntrenamientos )
router.post('/', crearEntrenamiento )


module.exports =  router;