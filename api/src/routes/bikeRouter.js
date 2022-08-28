const { Router } = require('express');
const { getAllBikes, getRenderedBikes, getBikeType, getBikeTraction, getBikeWheelSize, getBikePrice, orderBikeName, orderBikeRating, orderBikePrice, getBikeColor, getBikeId, deleteBike } = require('../controllers/bikeControllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )


router.get('/', getAllBikes);
router.get('/rendered', getRenderedBikes);
router.get('/:bikeId', getBikeId)
router.delete('/:id', deleteBike)



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
