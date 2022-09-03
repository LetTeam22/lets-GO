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
            }], where: {idBooking}
        })
    
        //consulto los datos del usuario
        let user = await User.findByPk(bookingAndBikes.userIdUser)
    
        //combino ambos (usuario y booking)
        const everyThing = {...bookingAndBikes.toJSON(),...user.toJSON()}
        
        res.send(everyThing)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {getEverything}