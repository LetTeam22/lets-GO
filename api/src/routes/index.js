const { Router } = require('express');
const bookingRouter = require('./bookingRouter')
const bikeRouter = require('./bikeRouter')
const userRouter = require('./userRouter');


const router = Router();
router.use('/bookings', bookingRouter)
router.use('/bikes', bikeRouter)
router.use('/user', userRouter)


module.exports = router;
