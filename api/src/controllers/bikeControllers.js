const { Bike, Booking } = require('../db')

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

const getBikeId = async (req, res, next) => {
    const { bikeId } = req.params;
    try {
        const filterId = await Bike.findOne({
            where: { idBike: bikeId }
        })
        res.send(filterId)
    } catch (error) {
        next(error)
    }
}


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

const getBikePrice = async (req, res, next) => {
    const { max, min } = req.body
    try {
        const allBikes = await Bike.findAll();
        let priceFiltered = allBikes.filter(b => (b.price <= max && b.price >= min))
        res.send(priceFiltered)
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
                if (a.rating > b.rating) return 1;
                if (b.rating > a.rating) return -1;
                return 0;
            })
            : orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.rating > b.rating) return -1;
                if (b.rating > a.rating) return 1;
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
                if (a.price > b.price) return 1;
                if (b.price > a.price) return -1;
                return 0;
            })
            : orderedBikes = unorderedBikes.sort(function (a, b) {
                if (a.price > b.price) return -1;
                if (b.price > a.price) return 1;
                return 0;
            });
        res.send(orderedBikes)
    } catch (error) {
        next(error)
    }
}

//Delete
const deleteBike = async (req, res, next) => {
    const { id } = req.params;
    try {
        let deletedBike = await Bike.findByPk(id)
        await deletedBike.destroy()
        res.status(200).send('Bike deleted succesfully')
    } catch (error) {
        next(error)
    }
}

//Post?? Put/Patch ??

module.exports = {
    getAllBikes,
    getBikeId,
    getBikeType,
    getBikeTraction,
    getBikeWheelSize,
    getBikeColor,
    getBikePrice,
    orderBikeName,
    orderBikeRating,
    orderBikePrice,
    deleteBike
}