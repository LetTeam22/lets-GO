const { User, Bike, Booking, Experience, Accesories, Adventures, Contact } = require("../db");
const jsonUser = require('../data/users.json')
const jsonBike = require('../data/bikes.json')
const jsonBooking = require('../data/bookings.json')
const jsonExperience = require('../data/experiences.json')
const jsonAccs = require('../data/accesories.json')
const jsonAdvs = require('../data/adventure.json')
const jsonContacts = require('../data/contactMessages.json')
const { postBooking } = require('./bookingsControllers')
const { createExperience } = require('./experienceControllers')
const { } = require('./accesoriesControllers')

async function loadAllModelsInDB() {

  await Contact.bulkCreate(jsonContacts);
  console.log('Contact messages loaded ok to DB')

  await Accesories.bulkCreate(jsonAccs);
  console.log('Accesories loaded ok to DB')

  await User.bulkCreate(jsonUser)
  console.log('Users loaded ok to DB');

  await Bike.bulkCreate(jsonBike)
  console.log('Bikes loaded ok to DB');

  await Adventures.bulkCreate(jsonAdvs);
  console.log('Adventures loaded ok to DB')

  await Promise.all(
    jsonBooking.map(booking => {
      return postBooking({ body: booking }, { sendStatus: () => { }, send: () => { } }, () => { })
    })
  ); console.log('Bookings loaded ok to DB')

  await Experience.bulkCreate(jsonExperience)
  // await Promise.all(
  //   jsonExperience.map(experience => {
  //     return createExperience({body:experience},{sendStatus:()=>{},send:()=>{}},()=>{})
  //   })
  // ); 
  console.log('Experiences loaded ok to DB');

  //IMPORTANTE! bulkCreate() no va a funcionar correctamente 
  // si no toma en cuenta las relaciones de las tablas!!!
  // Booking.bulkCreate(jsonBooking)
  // console.log('Bookings loaded ok to DB');
  // Experience.bulkCreate(jsonExperience);
  // console.log('Experiences loaded ok to DB');
}



module.exports = {
  loadAllModelsInDB
}