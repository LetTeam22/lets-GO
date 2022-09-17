require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORTDB 
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/letsgo`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: PORTDB,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/letsgo`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Bike, Booking, Accesories,Experience, Order, Historyrating } = sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Booking)
Booking.belongsTo(User)
Booking.belongsToMany(Bike, { through: 'bikes_bookings' })
Bike.belongsToMany(Booking, { through: 'bikes_bookings' })
Booking.belongsToMany(Accesories, { through: 'booking_accs' })
Accesories.belongsToMany(Booking, { through: 'booking_accs' })
//Agregando relacion de experiencias de usuarios
// User.hasMany(Experience)
// Experience.belongsTo(User)
Booking.hasOne(Experience)
Experience.belongsTo(Booking)
//Agregando relacion para agregar bicis favoritas
Bike.belongsToMany(User, { through: 'fav_bikes' })
User.belongsToMany(Bike, { through: 'fav_bikes' })

// Relacion user-order-MP
User.hasMany(Order);
Order.belongsTo(User);

// Relacion para Rating many to many
Booking.belongsToMany(Historyrating, { through: 'score_history' })
Historyrating.belongsToMany(Booking, { through: 'score_history' })

// Relacion para agregar likes a las experiencias
Experience.belongsToMany(User, { through: 'fav_experiences' })
User.belongsToMany(Experience, { through: 'fav_experiences' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
