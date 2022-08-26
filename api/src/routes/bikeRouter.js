const { Router } = require('express');
const { getAllBikes, getBikeType, getBikeTraction, getBikeWheelSize } = require('../controllers/bikeControllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )


router.use('/type/:bikeType', getBikeType);
router.use('/traction/:bikeTraction', getBikeTraction);
router.use('/wheelsize/:bikeWheeelSize', getBikeWheelSize)
router.use('/', getAllBikes);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
