const { Router } = require('express');
const { getAllAdventures, postAdventure, postAdventureWithApiGPT, updateAdventure, updatePricesAdv } = require('../controllers/adventureControllers')


const router = Router();

router.get('/', getAllAdventures)
router.post('/create', postAdventure)
router.post('/createGPT', postAdventureWithApiGPT)
router.put('/update', updateAdventure)
router.put('/prices', updatePricesAdv)


module.exports = router