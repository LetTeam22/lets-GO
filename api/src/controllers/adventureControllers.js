const { Adventures, advBookings } = require('../db')

// Get all adventures
const getAllAdventures = async (req, res, next) => {
    try {
        const allAdventures = await Adventures.findAll()
        res.send(allAdventures)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAdventures
}