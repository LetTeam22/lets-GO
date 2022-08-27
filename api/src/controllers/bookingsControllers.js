const { User, Bike, Booking } = require('../db');

async function getAllBookings(req, res, next) {
  try {
    let bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['userName'],
        }, 
        {
          model: Bike,
          attributes: ['name'],
          through: {
            attributes: []
          }
        } 
      ]
    })
    bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
    bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
    res.send(bookings)
  } catch (error) {
    next(error)
  }
}

async function getBookingsByUserId(req, res, next) {
  const { userId } = req.params
  if (!userId) return res.sendStatus(400)
  try {
    let bookings = await Booking.findAll({
      where: { userIdUser: userId },
      include: [
        {
          model: Bike,
          attributes: ['name'],
          through: {
            attributes: []
          }
        } 
      ]
    })
    if (!bookings.length) return res.status(422).send('This user has no bookings')
    bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
    bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
    res.send(bookings)
  } catch (error) {
    next(error)
  }
}

async function postBooking(req, res, next) {
  const { startDate, endDate, userId, bikeIds } = req.body
  if (!startDate || !endDate || !userId || !bikeIds.length) return res.sendStatus(400)
  try {
    let booking = {startDate, endDate, userIdUser: userId}
    let bookingCreated = await Booking.create(booking)
    let bikes = await Bike.findAll({
      where: {
        idBike: bikeIds
      } 
    })
    bookingCreated.addBike(bikes)
    res.send('The booking was created successfully')
  } catch (error) {
    next(error)
  }
}

async function cancelBooking(req, res, next) {
  const { bookingId } = req.params
  if (!bookingId) return res.sendStatus(400)
  try {
    let booking = await Booking.findByPk(bookingId)
    if (!booking) return res.status(422).send(`The booking with id ${bookingId} does not exist`)
    booking.update({ status: 'cancelled' })
    res.send(`The booking with id ${bookingId} was cancelled successfully`)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getAllBookings,
  getBookingsByUserId,
  postBooking,
  cancelBooking
}
