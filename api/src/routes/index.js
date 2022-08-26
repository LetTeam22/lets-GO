const { Router } = require('express');
const bookingRouter = require('./bookingRouter')

const router = Router();

router.use('/bookings', bookingRouter)




module.exports = router;
