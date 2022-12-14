const { Router } = require('express');
const { getAllAccesories, getAccId, postAccesory, updateAccesory, updatePricesAcc } = require('../controllers/accesoriesControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )
router.get('/:id', getAccId);
router.get('/', getAllAccesories)
router.post('/create', postAccesory)
router.put('/update', updateAccesory)
router.put('/prices', updatePricesAcc)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;