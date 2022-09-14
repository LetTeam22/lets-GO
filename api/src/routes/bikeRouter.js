const { Router } = require('express');
const { getAllBikes, getRenderedBikes, getBikeId, postBike, updateBike, 
    deleteFavorite, postFavorite, getAllFavorites, updateRating, updatePrices,
    ratingHistoryBooking,
} = require('../controllers/bikeControllers')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// router.use('/', nombre )


router.get('/', getAllBikes);
router.get('/rendered', getRenderedBikes);
router.get('/:bikeId', getBikeId)
router.post('/create', postBike)
router.put('/update', updateBike)
router.put('/prices', updatePrices)

//Dado id de bike y email por body
// agrega la bike a fav y devuleve bike agregada
router.post('/fav',postFavorite)

//Dado id de bike y email por body
// elimina la bike a fav y devuleve bike eliminada
router.put('/removeFav',deleteFavorite)

//Obtiene todas las bicicletas favoritas de un usuario
// Recibe por params un email de usuario
router.get('/getAllFavorites/:email',getAllFavorites)

//Actualiza el Rating de una Bicicleta
router.post('/updateRating',updateRating)

//Get del historial, solo para un booking en particular
// ejemplo: http://localhost:3001/bikes/getRatingHistory?idBooking=14
router.get('/getRatingHistory/:idBooking',ratingHistoryBooking)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
