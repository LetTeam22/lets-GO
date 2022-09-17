const { Router } = require('express');
const bookingRouter = require('./bookingRouter');
const bikeRouter = require('./bikeRouter');
const userRouter = require('./userRouter');
const accRouter = require('./accRouter');
const experienceRouter = require('./experienceRouter');
const generalRouter = require('./generalRouter')
const mercadopago = require('./mercadopago')

const router = Router();
router.use('/accesories', accRouter);
router.use('/bikes', bikeRouter);
router.use('/bookings', bookingRouter);
router.use('/user', userRouter);
router.use('/experience', experienceRouter);
router.use('/general', generalRouter);
router.use('/mercadopago', mercadopago);

module.exports = router;
