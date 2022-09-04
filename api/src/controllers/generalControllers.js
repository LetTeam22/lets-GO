const {User, Bike, Booking, Experience} = require ('../db.js')

//Dado un BookingID me devuelve Datos de Booking, Usuario, Bici,
async function getEverything(req, res, next) {
    const {idBooking} = req.query

    try {
        //consulto los datos del booking
        const bookingAndBikes = await Booking.findOne({
            include: [{
                model: Bike,
                through: { attributes: [] },
                attributes:['idBike']
            }], where: {idBooking:idBooking}
        })
    
        //consulto los datos del usuario
        let user = await User.findByPk(bookingAndBikes.userIdUser)
    
        //combino ambos (usuario y booking)
        const everyThing = {...bookingAndBikes.toJSON(),...user.toJSON()}
        
        res.send(everyThing)
    } catch (error) {
        res.send({e:error.message})
    }
}


//Dado un usuario me devuelve todas sus reservas
async function getUserBookings(req, res, next) {
    const {email} = req.query
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        try {
            //consulto los datos del booking
            const bookingAndBikes = await Booking.findAll({
                include: [{
                    model: Bike,
                    through: { attributes: [] },
                    attributes:['idBike']
                }], where: {userIdUser:user.idUser},
                // include:[{
                //     model:Experience,
                //     where: {userIdUser:user.idUser}
                // }]
            })

            res.send(bookingAndBikes)
        } catch (error) {
            res.send({e:error.message})
        }
    }else res.send({e:'usuario no existe'})
}

//Dado un usuario me devuelve solo reservas con experiencia publicada
async function getUserOnlyExperience(req, res, next) {
    const {email} = req.query
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        try {
            //consulto los datos del booking
            const bookingAndBikes = await Booking.findAll({
                include: [{
                    model: Bike,
                    through: { attributes: [] },
                    attributes:['idBike']
                }], where: {userIdUser:user.idUser},
                include:[{
                    model:Experience,
                    where: {userIdUser:user.idUser}
                }]
            })

            res.send(bookingAndBikes)
        } catch (error) {
            res.send({e:error.message})
        }
    }else res.send({e:'usuario no existe'})
}

module.exports = {getEverything,getUserBookings,getUserOnlyExperience}