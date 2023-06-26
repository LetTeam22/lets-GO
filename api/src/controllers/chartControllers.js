const {User, Experience, Booking, Bike, Contact} = require ('../db.js');


// Devuelve todas las experiencias
async function getSentimentsStats (req, res, next) {
    const {year} = req.params;
    try {
        const sentArray = ['Positivo','Neutro','Negativo']
        const experiences = await Experience.findAll({
            include: { 
                model: Booking,
                attributes: ['startDate', 'endDate', 'userIdUser'],
                include: [{
                    model: User,
                    attributes: ['email']
                }, {
                    model: Bike,
                    attributes: ['name']
                }], 
            }, 
            order: [['idExperience', 'DESC']],
        });
        const contacts = await Contact.findAll();
        let positivo = experiences.filter(experience => experience.sentiment === 'Positivo').length;
        let negativo = experiences.filter(experience => experience.sentiment === 'Negativo').length;
        let neutro = experiences.filter(experience => experience.sentiment === 'Neutro').length;
        positivo = positivo + contacts.filter(contact => contact.sentiment ==='Positivo').length;
        negativo = negativo + contacts.filter(contact => contact.sentiment ==='Negativo').length;
        neutro = neutro + contacts.filter(contact => contact.sentiment ==='Neutro').length;
        const data = {sentimiento:'Sentimiento', positivo, negativo, neutro}
        res.send([data])    
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getSentimentsStats,
  }