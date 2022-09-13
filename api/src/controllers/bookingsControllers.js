const { User, Bike, Booking, Accesories, Experience } = require('../db');
const { Op } = require("sequelize");

async function getAllBookings(req, res, next) {
  try {
    let bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
        {
          model: Bike,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: Accesories,
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
          attributes: ['name', 'image', 'idBike', 'rating'],
          through: {
            attributes: []
          }
        },
        {
          model: Accesories,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    if (!bookings.length) return res.send({ msg: 'This user has no bookings' })
    bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
    bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
    res.send(bookings)
  } catch (error) {
    next(error)
  }
}

async function getBookingsByBikeIds(req, res, next) {
  const { bikeIds } = req.params;
  if (!bikeIds) return []
  const arrBikeIds = bikeIds.split(',')
  try {
    const bikes = await Bike.findAll({
      where: { idBike: { [Op.or]: arrBikeIds } },
      include: {
        model: Booking,
        attributes: ['startDate', 'endDate', 'status'],
        through: { attributes: [] },
        where: { status: 'confirmed' }
      }
    })
    const disabledDates = []
    bikes.forEach(bike => bike.bookings.forEach(booking => disabledDates.push([booking.startDate, booking.endDate])))
    res.send(disabledDates)
  } catch (error) {
    next(error)
  }
}

async function postBooking(req, res, next) {
  const { startDate, endDate, userId, bikeIds, AccIds = [], totalPrice } = req.body
  if (!startDate || !endDate || !userId || !bikeIds.length || !totalPrice) return res.sendStatus(400)
  try {
    let booking = { startDate, endDate, userIdUser: userId, totalPrice: Number(totalPrice) }
    let bookingCreated = await Booking.create(booking)
    let bikes = await Bike.findAll({
      where: {
        idBike: bikeIds
      }
    })
    let accesoriesForBooking = await Accesories.findAll({
      where: {
        idAcc: AccIds
      }
    })
    await bookingCreated.addBike(bikes)
    await bookingCreated.addAccesories(accesoriesForBooking)
    res.send('The booking was created successfully')
  } catch (error) {
    next(error)
  }
}

// Update
async function updateBooking (req, res, next) {
  const {idBooking, startDate, endDate, totalPrice, status} = req.body
  const booking = await Booking.findByPk(idBooking);
  if (booking) {
      if(startDate) booking.startDate = startDate
      if(endDate) booking.endDate = endDate
      if(totalPrice) booking.totalPrice = totalPrice
      if(status) booking.status = status
      await booking.save()
      res.send(booking)
  }else res.send({e:'reserva no existe'})
}

module.exports = {
  getAllBookings,
  getBookingsByUserId,
  getBookingsByBikeIds,
  postBooking,
  updateBooking
}
