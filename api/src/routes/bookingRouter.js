const { Router } = require('express');
const { getAllBookings, postBooking, test } = require('../controllers/bookingsControllers');

const router = Router();
// router.get('/', getAllBookings)
router.get('/', test)
router.post('/', postBooking)



module.exports = router;
