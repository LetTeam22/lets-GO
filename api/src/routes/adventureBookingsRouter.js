const { Router } = require('express');
const { getAdvBookingsById, postAdvBookings } = require('../controllers/advBookingsControllers')

const router = Router();

router.get('/:id', getAdvBookingsById);
router.post('/', postAdvBookings)

module.exports = router