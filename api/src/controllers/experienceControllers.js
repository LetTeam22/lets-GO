const {User, Experience, Booking} = require ('../db.js')


// Devuelve todas las experiencias
async function allExperiences (req, res, next) {
    const experience = await Experience.findAll();
    if(experience.length) res.send(experience)
    else res.send('Aún no existen experiencias')
}


// Devuelve los detalles de una Experiencia dado el BookingID
async function experienceDetails (req, res, next) {
    const {bookingIdBooking} = req.query
    const expDetails = await Booking.findOne({
        include:[{model:Experience,
            where: {bookingIdBooking: bookingIdBooking }},
        ],
    });
    if(expDetails) res.send(expDetails)
    else res.send('Experiencia de usuario no existe')
}

// crea una experiencia, necesita recibir ID de booking
async function createExperience(req, res, next) {
    let {imgExperience,textExperience,bookingIdBooking
    } = req.body

    try {
        // Busco el ID de user correspondiente al Booking 
        // let bookingForUser = await Booking.findOne({
        //     where: { idBooking: bookingIdBooking },
        // })
        // console.log('usuario',user.toJSON())
        // let userIdUser = bookingForUser.userIdUser
        // console.log(userIdUser)
        //Ahora si, se procede a guardar en la base de datos.
        const post = await Experience.create({
            imgExperience,
            textExperience,
            bookingIdBooking,
            // userIdUser
        });
        res.send(post)
    } catch (error) {
        res.send(error.message)
    }
}

// Actualiza Experiencia (recibe por body el ID de experiencia y los datos a cambiar)
// Devuelve la experiencia actualizada
async function updateExperience (req, res, next) {
    const {idExperience, imgExperience, textExperience, status} = req.body

    try {
        const experience = await Experience.findByPk(idExperience);
        if (experience) {
            if(imgExperience) experience.imgExperience = imgExperience
            if(textExperience) experience.textExperience = textExperience
            if(status) experience.status = status
            await experience.save()
            res.send(experience)
        }else res.send({e:'Experiencia no existe'})

    } catch (error) {
        res.send(error.message)
    }
}


module.exports = {experienceDetails, createExperience, updateExperience, allExperiences}