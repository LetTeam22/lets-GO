const { Router } = require('express');
const { getAllBookings, getBookingsByUserId, getBookingsByBikeIds,
     postBooking, updateBooking, getBookingsByUserEmail, 
    } = require('../controllers/bookingsControllers');

const router = Router();
router.get('/', getAllBookings)
router.get('/bike/:bikeIds', getBookingsByBikeIds)
router.get('/:userId', getBookingsByUserId)
router.post('/', postBooking)
router.put('/update', updateBooking)
router.get('/bookingbyemail/:email',getBookingsByUserEmail)



module.exports = router;
