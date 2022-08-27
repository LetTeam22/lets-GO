const { Bike, Booking, User } = require('../db')

//Get

const getAllBikes = async (req, res, next) => {
    try {
        const allBikes = await Bike.findAll({
            include: {
                model: Booking,
                arrtibutes: ['startDate', 'endDate'],
                through: { attributes: [] }
            }
        })
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

const getBikeColor = async (req, res, next) => {

    const { bikeColor } = req.params;
    try {
        const filterWheelSize = await Bike.findAll({
            where: { color: bikeColor }
        })
        res.send(filterWheelSize)
    } catch (error) {
        next(error)
    }
}

//Order
const orderBikeName = async (req, res, next) => {
    let { orderName } = req.params;
    try {
        const unorderedBikes = await Bike.findAll();
        let orderedBikes = [];
        orderName === 'asc' ?
            orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            })
            : orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            });
        res.send(orderedBikes)
    } catch (error) {
        next(error)
    }
}

const orderBikeRating = async (req, res, next) => {
    let { orderRating } = req.params;
    try {
        const unorderedBikes = await Bike.findAll();
        let orderedBikes = [];
        orderRating === 'asc' ?
            orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            })
            : orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            });
        res.send(orderedBikes)
    } catch (error) {
        next(error)
    }
}

const orderBikePrice = async (req, res, next) => {
    let { orderPrice } = req.params;
    try {
        const unorderedBikes = await Bike.findAll();
        let orderedBikes = [];
        orderPrice === 'asc' ?
            orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            })
            : orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            });
        res.send(orderedBikes)
    } catch (error) {
        next(error)
    }
}



//Post?? Delete ?? Put/Patch ??


module.exports = {
    getAllBikes,
    getBikeType,
    getBikeTraction,
    getBikeWheelSize,
    getBikeColor,
    orderBikeName,
    orderBikeRating,
    orderBikePrice
}