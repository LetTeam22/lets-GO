const { Router } = require('express');
const { getAllBookings, getBookingsByUserId, getBookingsByBikeId, postBooking, cancelBooking } = require('../controllers/bookingsControllers');

const router = Router();
router.get('/', getAllBookings)
router.get('/bike/:bikeId', getBookingsByBikeId)
router.get('/:userId', getBookingsByUserId)
router.post('/', postBooking)
router.put('/:bookingId', cancelBooking)



module.exports = router;
