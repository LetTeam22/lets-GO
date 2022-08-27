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
    res.send('Booking created')
  } catch (error) {
    next(error)
  }
}

async function test(req, res, next) {
  try {
    let user = await User.findByPk(1)
    let has = await user.getBookings()
    let count = await user.countBookings()
    res.send(has)
    console.log(count)
  } catch (error) {
    next(error)
  }
}



module.exports = {
  getAllBookings,
  postBooking,
  test
}
