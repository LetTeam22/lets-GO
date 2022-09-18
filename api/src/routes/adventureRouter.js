const { Router } = require('express');
const { getAllAdventures, postAdvBookings, getAdvBookingsById } = require('../controllers/adventureControllers')

const router = Router();

router.get('/:id', getAdvBookingsById)
router.get('/', getAllAdventures)
router.post('/', postAdvBookings)

module.exports = router