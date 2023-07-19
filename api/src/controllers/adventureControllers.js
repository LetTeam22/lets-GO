const { Adventures } = require('../db')
const { getTextCorrection  } = require('./gpt/prompt.js')
const { getApiGPTresponse } = require('./gpt/apiGPTControllers.js');



// Get all adventures
const getAllAdventures = async (req, res, next) => {
    try {
        let allAdventures = await Adventures.findAll()
        res.send(allAdventures)
    } catch (error) {
        next(error);
    }
}


// Post
const postAdventure = async (req, res, next) => {

    let { name, description, conditions, image, price, difficulty, date } = req.body

    if (!name || !description || !conditions || !image || !price || !date) return res.send({ msg: 'faltan datos' })
    date = date.join(', ')
    const adv = { name, description, conditions, image, price, difficulty, date }
    const advCreated = await Adventures.create(adv)

    res.send(advCreated)
}

// crea una aventura y la procesa con api GPT
const postAdventureWithApiGPT = async (req, res, next) => {
    let { name, description, conditions, image, price, difficulty, date } = req.body
    if (!name || !description || !conditions || !image || !price || !date) return res.send({ msg: 'faltan datos' })
    date = date.join(', ')
    try {
        const correctedDescrPrompt = getTextCorrection(description)
        const correctedConditPromt = getTextCorrection(conditions)
        const [correctedDescr, correctedCondit] = await Promise.all([
            getApiGPTresponse(correctedDescrPrompt, 0, 200),
            getApiGPTresponse(correctedConditPromt, 0, 200)
        ]);
        const advCreated = await Adventures.create({
            name,
            description: correctedDescr,
            conditions: correctedCondit,
            image,
            price,
            difficulty,
            date
        });
        res.send(advCreated)
    } catch (error) {
        next(error)
    }
};

// Update
const updateAdventure = async (req, res, next) => {

    const { idAdv, name, description, conditions, image, price, difficulty, date, status } = req.body

    const adv = await Adventures.findByPk(idAdv);

    if (adv) {
        if (name) adv.name = name
        if (description) adv.description = description
        if (conditions) adv.conditions = conditions
        if (image) adv.image = image
        if (price) adv.price = price
        if (difficulty) adv.difficulty = difficulty
        if (date) adv.date = date
        if (status) adv.status = status
        await adv.save()
        res.send(adv)
    } else res.send({ e: 'aventura no existe' })
}

// Update prices
const updatePricesAdv = async (req, res, next) => {
    const { percentage } = req.body
    try {
        const adventures = await Adventures.findAll();
        percentage && adventures.forEach(a => {
            a.price = Math.round(Number(a.price) * (1 + Number(percentage)))
            a.save()
        })
        res.send('Precios de aventuras actualizados')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAdventures,
    postAdventure,
    postAdventureWithApiGPT,
    updateAdventure,
    updatePricesAdv
}