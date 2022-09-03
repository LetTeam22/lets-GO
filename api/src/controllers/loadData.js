const { User, Bike, Booking, Experience, Accesories} = require("../db");
const jsonUser = require('../data/users.json')
const jsonBike = require('../data/bikes.json')
const jsonBooking = require('../data/bookings.json')
const jsonExperience = require('../data/experiences.json')
const jsonAccs = require('../data/accesories.json')


function loadAllModelsInDB() {
  User.bulkCreate(jsonUser)
  console.log('Users loaded ok to DB');
  Bike.bulkCreate(jsonBike)
  console.log('Bikes loaded ok to DB');


  //Funcionan bello pero, no toman en cuenta las relaciones
  //Por lo tanto en alguna consulta pueden generar errrores.
  // Booking.bulkCreate(jsonBooking)
  // console.log('Bookings loaded ok to DB');
  // Experience.bulkCreate(jsonExperience);
  // console.log('Experiences loaded ok to DB');

  Accesories.bulkCreate(jsonAccs);
  console.log('Accesories loaded ok to DB')

}



module.exports = {
  loadAllModelsInDB
}