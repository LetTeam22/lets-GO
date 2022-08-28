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
        const filterId = await Bike.findAll({
            where: { idAcc: id }
        })
        res.send(filterId);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAccesories,
    getAccId
};