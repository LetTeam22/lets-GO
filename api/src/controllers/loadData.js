const { Bike, Booking, User } = require("../db");
const jsonUser = require('../data/users.json')
const jsonBike = require('../data/50bikes.json')
const jsonBooking = require('../data/bookings.json')

function loadUsersInDB() {
  User.bulkCreate(jsonUser)
}

function loadBikesInDB() {
  Bike.bulkCreate(jsonBike)
}

function loadBookingsInDB() {
  Booking.bulkCreate(jsonBooking)
}

function loadAllModelsInDB() {
  loadUsersInDB()
  console.log('Users loaded ok to DB');
  loadBikesInDB()
  console.log('Bikes loaded ok to DB');
  // loadBookingsInDB()
  // console.log('Bookings loaded ok to DB');
}



module.exports = {
  loadUsersInDB,
  loadBikesInDB,
  loadBookingsInDB,
  loadAllModelsInDB
}