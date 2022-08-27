const {User, Bike, Booking} = require ('../db.js')



// devuelve un arreglo de objetos con todos los usuarios
async function getAllUsers(req, res, next) {
   let users = await User.findAll();
    // console.log(users[0].toJSON())
    res.send(users)
}



// crea un usuario, como minimo hace falta su correo.
async function createUser(req, res, next) {
    const {userName,email,firstName,lastName,cellphone
        ,profilePic,creditCard,isAdmin
    } = req.body

    const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          userName,
          firstName,
          lastName,
          cellphone,
          profilePic,
          creditCard,
          isAdmin
        }
    });
    res.send({user,created})
}

// Devuelve true si el correo esta en la DB, de lo contrario devuelve false
async function isInDB (req, res, next) {
    const {email} = req.query
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
    res.send(false)
    } else {
    res.send(true)
    }
}

// Devuelve los detalles de un usuario dado su email por query
async function getDetails (req, res, next) {
    const {email} = req.query
    const user = await User.findAll({
        where: { email: email }
    });
    res.send(user[0])
}

// Actualiza usuario (recibe por body email y datos a cambiar)
// Devuelve datos del usuario actualizados
async function updateUser (req, res, next) {
    const {userName,email,firstName,
        lastName,cellphone,profilePic,creditCard,isAdmin
    } = req.body
    
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        if(userName) user.userName = userName
        if(firstName) user.firstName = firstName
        if(lastName) user.lastName = lastName
        if(cellphone) user.cellphone = cellphone
        if(profilePic) user.profilePic = profilePic
        if(creditCard) user.creditCard = creditCard
        if(req.body.hasOwnProperty("isAdmin")) user.isAdmin = isAdmin
        await user.save()
        res.send(user)
    }else res.send({e:'usuario no existe'})
}




module.exports = {getAllUsers, isInDB, createUser,getDetails, updateUser}