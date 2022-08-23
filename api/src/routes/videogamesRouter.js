const { Router } = require('express');
const { getVideogames, postVideogame } = require('../controllers/videogamesControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', getVideogames)
router.post('/', postVideogame)

module.exports = router