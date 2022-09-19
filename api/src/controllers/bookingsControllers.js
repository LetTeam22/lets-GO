const { User, Bike, Booking, Accesories, Experience, Adventures } = require('../db');
const { Op } = require("sequelize");
const { sortBookings } = require('./helpers');

async function getAllBookings(req, res, next) {
  try {
    let bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'firstName'],
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
        },
        {
          model: Adventures,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    // ordenar fechas de menor a mayor y por estado
    const sortedBookings = sortBookings(bookings)
    res.send(sortedBookings)
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
        },
        {
          model: Adventures,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    if (!bookings.length) return res.send({ msg: 'This user has no bookings' })
    // ordenar fechas de menor a mayor y por estado
    const sortedBookings = sortBookings(bookings)
    res.send(sortedBookings)
  } catch (error) {
    next(error)
  }
}

async function getBookingsByUserEmail(req, res, next) {
  const { email } = req.params
  if (!email) return res.sendStatus(400)
  try {
    let bookings = await Booking.findAll({
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
        },
        {
          model: User,
          attributes: ['email'],
          where: { email: email }
        },
        {
          model: Adventures,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ],
    })
    if (!bookings.length) return res.send({ msg: 'This user has no bookings' })
    // ordenar fechas de menor a mayor y por estado
    const sortedBookings = sortBookings(bookings)
    res.send(sortedBookings)
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
  const { startDate, endDate, userId, bikeIds, AccIds = [], totalPrice, adventureNames = [] } = req.body
  
  if (!userId || !totalPrice) return res.sendStatus(400)
  try {
    let booking = {}
    if(startDate && endDate) booking = { startDate, endDate, userIdUser: userId, totalPrice: Number(totalPrice) }
    else booking = { userIdUser: userId, totalPrice: Number(totalPrice) }
    
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
    let adventuresForBooking = await Adventures.findAll({
      where: {
        name: adventureNames
      }
    })
    await bookingCreated.addBike(bikes)
    await bookingCreated.addAccesories(accesoriesForBooking)
    await bookingCreated.addAdventures(adventuresForBooking)
    res.send('The booking was created successfully')
  } catch (error) {
    next(error)
  }
}

// Update
async function updateBooking(req, res, next) {
  const { idBooking, startDate, endDate, totalPrice, status } = req.body
  const booking = await Booking.findByPk(idBooking);
  if (booking) {
    if (startDate) booking.startDate = startDate
    if (endDate) booking.endDate = endDate
    if (totalPrice) booking.totalPrice = totalPrice
    if (status) booking.status = status
    await booking.save()
    res.send(booking)
  } else res.send({ e: 'reserva no existe' })
}

module.exports = {
  getAllBookings,
  getBookingsByUserId,
  getBookingsByBikeIds,
  postBooking,
  updateBooking,
  getBookingsByUserEmail,
}
