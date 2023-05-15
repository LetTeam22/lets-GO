const { Router } = require('express');
const { testingApiGPT } = require('../controllers/apiGPTControllers')
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const router = Router();

// ruta: /gpt
router.get('/', testingApiGPT)

module.exports = router

