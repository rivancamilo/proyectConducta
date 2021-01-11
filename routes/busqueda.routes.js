const { Router } = require('express')
const router = Router();
const { getTodo,getBuscaCollention } =  require('../controllers/busqueda.controller');
 
router.get('/:busqueda', getTodo )
router.get('/:tabla/:busqueda', getBuscaCollention )


module.exports = router
