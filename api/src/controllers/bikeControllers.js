const { Bike, Booking, User } = require('../db')

//Get

const getAllBikes = async (req, res, next) => {
    try {
        const allBikes = await Bike.findAll(
            {
                include: {
                    model: Booking,
                }
            }
        )
        res.send(allBikes)
    } catch (error) {
        next(error)
    }
};

//Filters

const getBikeType = async (req, res, next) => {
    const { bikeType } = req.params;
    try {
        const filterType = await Bike.findAll({
            where: { type: bikeType }
        })
        res.send(filterType)
    } catch (error) {
        next(error)
    }
}

const getBikeTraction = async (req, res, next) => {

    const { bikeTraction } = req.params;
    try {
        const filterTraction = await Bike.findAll({
            where: { traction: bikeTraction }
        })
        res.send(filterTraction)
    } catch (error) {
        next(error)
    }
}

const getBikeWheelSize = async (req, res, next) => {

    const { bikeWheeelSize } = req.params;
    try {
        const filterWheelSize = await Bike.findAll({
            where: { wheelSize: bikeWheeelSize }
        })
        res.send(filterWheelSize)
    } catch (error) {
        next(error)
    }
}

//Order

const orderBikes = async (req, res, next) => {
    const { order } = req.params;
}

//Post?? Delete ?? Put/Patch ??


module.exports = {
    getAllBikes,
    getBikeType,
    getBikeTraction,
    getBikeWheelSize
}