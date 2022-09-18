const { Adventures, AdvBookings } = require('../db')


// Post uun booking de aventuras
//Get adventure Bookings

const getAdvBookingsById = (req, res, next) => {
    const { userId } = req.params
    if (!userId) return res.sendStatus(400)
    try {
        let advBookings = advBookings.findAll({
            where: { userIdUser: userId }
        })
    } catch (error) {
        next(error)
    }
}

const postAdvBookings = async (req, res, next) => {
    const { userId, adventureNames } = req.body
    if (!userId || !adventureNames) return res.sendStatus(400)
    try {
        let advBookingsData = { userId }
        let advBookingsCreated = await AdvBookings.create(advBookingsData)
        let adventuresBooked = await Adventures.findAll({
            where: {
                name: adventureNames
            }
        })
        await advBookingsCreated.addAdventures(adventuresBooked)
        res.send(advBookingsCreated)
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getAdvBookingsById,
    postAdvBookings
}