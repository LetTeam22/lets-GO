const { Router } = require('express');
const videogamesRouter = require('./videogamesRouter')
const videogameRouter = require('./videogameRouter')
const genreRouter = require('./genreRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/videogames', videogamesRouter)
router.use('/videogame', videogameRouter)
router.use('/genres', genreRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
