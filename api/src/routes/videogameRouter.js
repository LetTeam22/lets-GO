const { Router } = require('express');
const { getVideogameByID, deleteVideogame, updateVideogame } = require('../controllers/videogameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/:idVideogame', getVideogameByID)
router.delete('/:idVideogame', deleteVideogame)
router.put('/:idVideogame', updateVideogame)

module.exports = router