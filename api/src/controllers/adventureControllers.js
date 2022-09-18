const { Adventures, AdvBookings, User } = require('../db')

// Get all adventures
const getAllAdventures = async (req, res, next) => {
    try {
        let allAdventures = await Adventures.findAll()
        res.send(allAdventures)
    } catch (error) {
        next(error);
    }
}

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
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAdventures,
    getAdvBookingsById,
    postAdvBookings
}