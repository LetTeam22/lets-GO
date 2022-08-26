const {User, Bike, Booking} = require ('../db.js')



// devuelve un arreglo de objetos con todos los usuarios
async function getAllUsers(req, res, next) {
   let users = await User.findAll();
    // console.log(users[0].toJSON())
    res.send(users)
}



// crea un usuario
async function createUser(req, res, next) {
    const {userEmail} = req.query
    
}

module.exports = {getAllUsers}

