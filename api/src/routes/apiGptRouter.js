const { Router } = require('express');
const { testingApiGPT } = require('../controllers/gpt/apiGPTControllers')

const router = Router();

// ruta: /gpt
router.get('/', testingApiGPT)



module.exports = router

