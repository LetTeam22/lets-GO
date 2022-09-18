const { Router } = require('express');
Adventures, postAdvBookings, getAdvBookingsById } = require('../controllers/adventureControllers')
const { getAllAdventures, postAdventure, updateAdventure, updatePricesAdv } = require('../controllers/adventureControllers')


const router = Router();

router.get('/:id', getAdvBookingsById)
router.get('/', getAllAdventures)
router.post('/create', postAdventure)
router.put('/update', updateAdventure)
router.put('/prices', updatePricesAdv)


module.exports = router