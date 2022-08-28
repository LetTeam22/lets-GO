const { Router } = require('express');
const { getAllAccesories, getAccId } = require('../controllers/accesoriesControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )
router.use('/:id', getAccId);
router.use('/', getAllAccesories)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;