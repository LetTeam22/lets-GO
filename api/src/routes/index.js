const { Router } = require('express');
const bookingRouter = require('./bookingRouter')
const bikeRouter = require('./bikeRouter')

const router = Router();

router.use('/bookings', bookingRouter)
router.use('/bikes', bikeRouter)




module.exports = router;
