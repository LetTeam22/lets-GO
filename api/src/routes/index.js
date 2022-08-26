const { Router } = require('express');
const bikeRouter = require('./bikeRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )
router.use('/bikes', bikeRouter)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
