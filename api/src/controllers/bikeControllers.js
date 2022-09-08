const { Bike, Booking, User } = require('../db')
const { Op } = require("sequelize");

//Get
const getAllBikes = async (req, res, next) => {
    try {
        const allBikes = await Bike.findAll({
            include: {
                model: Booking,
                attributes: ['startDate', 'endDate'],
                through: { attributes: [] }
            }
        })
        res.send(allBikes)
    } catch (error) {
        next(error)
    }
};

const getRenderedBikes = async (req, res, next) => {

    // query
    const { typeFilter, tractionFilter, wheelSizeFilter, colorFilter, minPriceFilter, maxPriceFilter, 
            fromDateFilter, toDateFilter, sortsOrder, priceSort, ratingSort, nameSort, search } = req.query

    // ajusto algunos parametros de query
    const priceMin = !minPriceFilter ? 0 : minPriceFilter
    const priceMax = typeof maxPriceFilter === 'undefined' ? 999999 : maxPriceFilter
    const searchLow = search ? search.toLowerCase().replace('negra','negro').replace('blanca','blanco').replace('roja','rojo')
                                .replace('amarilla','amarillo').replace('mecanica','mecánica').replace('electrica','eléctrica') : ''
    const searchUp = search ? search[0].toUpperCase() + search.substring(1) : ''
    const searchNum = isNaN(Number(search)) ? 0 : Number(search)
    const fromDate = !fromDateFilter ? '9999-12-31' : fromDateFilter
    const toDate = !toDateFilter ? '1000-01-01' : toDateFilter

    // array de ordenamiento de sequelize
    let arrSorts = []
    if (sortsOrder) {
        arrSorts = sortsOrder.split(',').map(sort => {
            if (sort === 'price') return ['price', priceSort.toUpperCase()]
            if (sort === 'rating') return ['rating', ratingSort.toUpperCase()]
            if (sort === 'name') return ['name', nameSort.toUpperCase()]
        })
    } 

    try {

        // query
        let bikes = await Bike.findAll({

            where: {

                // filtros
                type: typeFilter ? typeFilter : { [Op.not]: null },
                traction: tractionFilter ? tractionFilter : { [Op.not]: null },
                wheelSize: wheelSizeFilter ? wheelSizeFilter : { [Op.not]: null },
                color: colorFilter ? colorFilter : { [Op.not]: null },
                price: minPriceFilter || maxPriceFilter ? { [Op.between]: [priceMin, priceMax] } : { [Op.not]: null },

                //search
                [Op.or]: [
                    { name: { [Op.or]: [ { [Op.substring]: searchLow }, { [Op.substring]: searchUp } ] } },
                    { type: { [Op.substring]: searchLow } },
                    { traction: { [Op.substring]: searchLow } },
                    { wheelSize: { [Op.eq]: searchNum } },
                    { color: { [Op.substring]: searchLow } },
                    { price: { [Op.eq]: searchNum } },
                    { rating: { [Op.eq]: searchNum } },
                ]
            },

            // ordenamiento
            order: arrSorts,

            // incluye las reservas asociadas
            include: {
                model: Booking,
                attributes: ['startDate', 'endDate'],
                through: { attributes: [] }
            }

        })

        // filtro de fecha
        bikes = bikes.filter(bike => {
            let available = true
            bike.bookings.forEach(booking => {
                if (!(booking.startDate > toDate || booking.endDate < fromDate)) available = false
            })
            return available
        })

        // bikes a renderizar
        res.send(bikes)

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

//obtener todas las bicis favoritas de un usuario
const getAllFavorites = async (req, res, next) =>{
    const {email} = req.params
    try {
        const allFav = await Bike.findAll({
            include: [{
                model: User,
                through: { attributes: [] },
                attributes:['email'],
                where:{email:email}
            }]
        })
        res.send(allFav)
    } catch (error) {
        res.send(error.message)
    }
}

//agregar bicis favoritas a un usuario
const postFavorite = async (req, res, next) => {
    const {bikeId, email} = req.body;
    try {
        const favBike = await Bike.findOne({
            where: { idBike: bikeId }
        })
        const user = await User.findOne({
            where: { email: email }
        })
        await user.addBike(favBike)
        res.send(favBike)
    } catch (error) {
        res.send(error.message)
    }
}

//borrar bicis de favoritas
const deleteFavorite = async (req, res, next) => {
    const {bikeId, email} = req.body;
    try {
        const favBike = await Bike.findOne({
            where: { idBike: bikeId }
        })
        const user = await User.findOne({
            where: { email: email }
        })
        await user.removeBike(favBike);
        res.send(favBike)
    } catch (error) {
        res.send(error.message)
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
    getRenderedBikes,
    getBikeId,
    deleteBike,
    postFavorite,
    deleteFavorite,
    getAllFavorites
}