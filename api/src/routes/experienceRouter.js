const { Router } = require('express');;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const {experienceDetails,updateExperience,
    createExperience, createExperienceWithApiGPT, allExperiences, getRenderedExperiences, postLike, deleteLike, getAllLikes
} = require ('../controllers/experienceControllers')

const router = Router();

// Obtiene los detalles de una experiencia, recibe por query el booking ID
// ejemplo: /experience/details?bookingIdBooking=1
router.get('/details',experienceDetails)

//Crea una experiencia, recibe ID de Booking a la cual va esa experiencia
// ruta: /experience/create
router.post('/create',createExperience)

// actualiza los datos de una experiencia, recibe ID de experiencia. (recibe por body)
// Si el ID no esta en la DB arroja un error "Experiencia no existe"
// ruta: /experience/update
router.put('/update', updateExperience)

// devuelve un array de todas las experiencias existentes
router.get('/getall',allExperiences)

// devuelve un array de experiencias aplicando filtros
// EJEMPLO: http://localhost:3001/experience/getFiltered?sort=nameASC&fromDate=2022-01-01&toDate=2022-04-01
router.get('/getFiltered',getRenderedExperiences)

router.get('/allLikes/:email', getAllLikes);
router.post('/like', postLike);
router.put('/deleteLike', deleteLike);


module.exports = router;