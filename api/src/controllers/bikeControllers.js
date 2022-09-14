const { Bike, Booking, User, Accesories } = require('../db')
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

// Get rendered bikes aplicando filtros, ordenamientos, search y fechas
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
    const searchNum = isNaN(Number(search)) ? -1 : Number(search)
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
                status: 'active',

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
                if (booking.status === 'confirmed' && !(booking.startDate > toDate || booking.endDate < fromDate)) available = false
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

// Post
const postBike = async (req, res, next) => {
    
    let { name, description, type, image, traction, wheelSize, 
        price, discount, rating, color, status, nunOfReviews } = req.body
    
    if (!name || !type || !image || !traction || !wheelSize || !price || !color) return res.sendStatus(400)
    if (traction === 'mecanica') traction = 'mecánica'
    if (traction === 'electrica') traction = 'eléctrica'
    let bike = { name, description, type, image, traction, wheelSize, 
        price, discount, rating, color, status, nunOfReviews }
    let bikeCreated = await Bike.create(bike)
    
    res.send(bikeCreated)
}

// Update bike
const updateBike = async (req, res, next) => {
    const {idBike, name, description, type, image, traction, wheelSize, price, discount, rating, color, status} = req.body
    
    const bike = await Bike.findByPk(idBike);

    if (bike) {
        if(name) bike.name = name
        if(description) bike.description = description
        if(type) bike.type = type
        if(image) bike.image = image
        if(traction) bike.traction = traction
        if(wheelSize) bike.wheelSize = wheelSize
        if(price) bike.price = price
        if(req.body.hasOwnProperty("discount")) bike.discount = discount
        if(rating) bike.rating = rating
        if(color) bike.color = color
        if(status) bike.status = status
        await bike.save()
        res.send(bike)
    } else res.send({e:'bicicleta no existe'})
}

// Puntuar Bike
const updateRating = async (req, res, next) => {
    const {idBike, rating} = req.body
    try {
        const bike = await Bike.findOne({
            where: {idBike:idBike}
        })
        let updateRating = 0;
        if (!bike.nunOfReviews) updateRating = rating
        else {
            updateRating = bike.rating?
            (bike.nunOfReviews * bike.rating + rating) / (bike.nunOfReviews + 1):
            rating;
        }
        await bike.update({
            rating: updateRating,
            nunOfReviews: bike.nunOfReviews + 1
        });
        res.send({ idBike: bike.idBike, rating: bike.rating })
    } catch (error) {
        next(error)
    }
}

// Update prices
const updatePrices = async (req, res, next) => {
    const { percentage } = req.body
    try {
        const bikes = await Bike.findAll();
        percentage && bikes.forEach(b => {
            b.price = Math.round(Number(b.price) * (1 + Number(percentage)))
            b.save()
        })
        res.send('Precios de bicicletas actualizados')
    } catch (error) {
        next(error)
    }
}

// Aplicar descuentos grupales
const applyGroupDiscounts = async (req, res, next) => {
    const { traction, wheelSize, color, type, discount } = req.body
    try {
        const bikes = await Bike.findAll({
            where: {
                traction: traction ? traction : { [Op.not]: null },
                wheelSize: wheelSize ? wheelSize : { [Op.not]: null },
                color: color ? color : { [Op.not]: null },
                type: type ? type : { [Op.not]: null },
                status: 'active'
            }
        })
        discount && bikes.forEach(b => {
            b.discount = discount
            b.save()
        })
        res.send('Descuentos aplicados')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBikes,
    getRenderedBikes,
    getBikeId,
    postBike,
    postFavorite,
    deleteFavorite,
    getAllFavorites,
    updateBike,
    updateRating,
    updatePrices,
    applyGroupDiscounts
}