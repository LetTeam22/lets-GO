const { Router } = require('express');
const { getAllAccesories, getAccId, updateAccesory } = require('../controllers/accesoriesControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )
router.get('/:id', getAccId);
router.get('/', getAllAccesories)
router.put('/update', updateAccesory)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;