const { Router } = require('express');
const { getSentimentsStats, getEarnings, getYearBookings } = require('../controllers/chartControllers');

const router = Router();

router.get('/sentiments', getSentimentsStats) // sentimientos

router.get('/earnings/:year', getEarnings) // ganancias por mes en un año

router.get('/bookings/:year', getYearBookings) // reservas por mes en un año

module.exports = router;