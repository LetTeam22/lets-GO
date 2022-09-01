const { User, Bike, Booking, Accesories } = require("../db");
const jsonUser = require('../data/users.json')
const jsonBike = require('../data/bikes.json')
const jsonBooking = require('../data/bookings.json')
const jsonAccs = require('../data/accesories.json')

function loadAllModelsInDB() {
  User.bulkCreate(jsonUser)
  console.log('Users loaded ok to DB');
  Bike.bulkCreate(jsonBike)
  console.log('Bikes loaded ok to DB');
  Accesories.bulkCreate(jsonAccs);
  console.log('Accesories loaded ok to DB')
  // Booking.bulkCreate(jsonBooking)
  // console.log('Bookings loaded ok to DB');
}



module.exports = {
  loadAllModelsInDB
}