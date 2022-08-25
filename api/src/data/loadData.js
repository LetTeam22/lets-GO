const { Bike, Booking, User } = require("../db");

function loadUsersInDB(json) {
  User.bulkCreate(json)
}

function loadBikesInDB(json) {
  Bike.bulkCreate(json)
}

function loadBookingsInDB(json) {
  Booking.bulkCreate(json)
}

module.exports = {
  loadUsersInDB,
  loadBikesInDB,
  loadBookingsInDB
}