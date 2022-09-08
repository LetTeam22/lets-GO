const { Router } = require('express');
const { getAllBikes, getRenderedBikes,
     getBikeType, getBikeTraction, getBikeWheelSize, getBikePrice,
      orderBikeName, orderBikeRating, orderBikePrice, getBikeColor,
       getBikeId, deleteBike, postFavorite, deleteFavorite,
      getAllFavorites} = require('../controllers/bikeControllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )


router.get('/', getAllBikes);
router.get('/rendered', getRenderedBikes);
router.get('/:bikeId', getBikeId)
router.delete('/:id', deleteBike)

//Dado id de bike y email por body
// agrega la bike a fav y devuleve bike agregada
router.post('/fav',postFavorite)

//Dado id de bike y email por body
// elimina la bike a fav y devuleve bike eliminada
router.put('/removeFav',deleteFavorite)


//Obtiene todas las bicicletas favoritas de un usuario
// Recibe por params un email de usuario
router.get('/getAllFavorites/:email',getAllFavorites)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
