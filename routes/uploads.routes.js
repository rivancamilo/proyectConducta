const { Router } = require('express')
const router = Router();
const { fileUpload, retornaAvatar  } = require('../controllers/uploads.controller')
const expressfileUpload = require('express-fileupload');

// default options
router.use(expressfileUpload());
 
router.put('/:tabla/:id', fileUpload )
router.get('/:tabla/:foto', retornaAvatar )


module.exports = router
