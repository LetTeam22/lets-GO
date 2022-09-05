const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const {getEverything, getUserBookings,getUserOnlyExperience
} = require ('../controllers/generalControllers')

const router = Router();

// Obtiene Usuario, Booking y Bikes pasando el ID del Booking por query
// Ejemplo: /general/getEveryThing?BookingID=1
router.get('/getEveryThing',getEverything)

// Obtiene Registro de TODAS las reservas de un usuario dado su email por query
// Ejemplo: /general/getUserHistory?email=maxi@gmail.com
router.get('/getUserHistory',getUserBookings)

//Obtiene Registro solo resrevas que tengan experiencia publicada
router.get('/getUserOnlyExperience',getUserOnlyExperience)

module.exports = router;