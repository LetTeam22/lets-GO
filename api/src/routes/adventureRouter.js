const { Router } = require('express');
const { getAllAdventures, postAdventure, updateAdventure, updatePricesAdv } = require('../controllers/adventureControllers')

const router = Router();

router.get('/', getAllAdventures)
router.post('/create', postAdventure)
router.put('/update', updateAdventure)
router.put('/prices', updatePricesAdv)

module.exports = router