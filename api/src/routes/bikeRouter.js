const { Router } = require('express');
const { getAllBikes, getRenderedBikes, getBikeId, updateBike } = require('../controllers/bikeControllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )


router.get('/', getAllBikes);
router.get('/rendered', getRenderedBikes);
router.get('/:bikeId', getBikeId)
router.put('/update', updateBike)



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
