const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const {getEverything
} = require ('../controllers/generalControllers')

const router = Router();

// Obtiene Usuario, Booking y Bikes pasando el ID del Booking por query
// Ejemplo: /general/getEveryThing?BookingID=1
router.get('/getEveryThing',getEverything)


module.exports = router;