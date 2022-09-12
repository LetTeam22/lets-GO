const { Accesories } = require('../db');

const getAllAccesories = async (req, res, next) => {
    try {
        const allAccs = await Accesories.findAll();
        res.send(allAccs)
    } catch (error) {
        next(error);
    }
};

const getAccId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const filterId = await Accesories.findAll({
            where: { idAcc: id }
        })
        res.send(filterId);
    } catch (error) {
        next(error);
    }
};

// Post
const postAccesory = async (req, res, next) => {
    
    const { name, description, image, price, status } = req.body
    
    if (!name || !image || !price) return res.sendStatus(400)

    let acc = { name, description, image, price, status }
    let accCreated = await Accesories.create(acc)
    
    res.send(accCreated)
}

// Update
const updateAccesory = async (req, res, next) => {
    const {idAcc, name, description, image, price, status} = req.body
    
    const acc = await Accesories.findByPk(idAcc);

    if (acc) {
        if(name) acc.name = name
        if(description) acc.description = description
        if(image) acc.image = image
        if(price) acc.price = price
        if(status) acc.status = status
        await acc.save()
        res.send(acc)
    }else res.send({e:'accesorio no existe'})
}

module.exports = {
    getAllAccesories,
    getAccId,
    postAccesory,
    updateAccesory
};