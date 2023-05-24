const {User, Experience, Booking, Bike} = require ('../db.js');
const { getApiGPTresponse, getExperiencePrompt } = require('./gpt/apiGPTControllers.js');


// Devuelve todas las experiencias
async function allExperiences (req, res, next) {
    try {
        const experience = await Experience.findAll({
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
        if(experience.length) res.send(experience)
        else res.send('nothing')      
    } catch (error) {
        next(error)
    }
};

// Aplica ordenamiento a las experiencias
const getRenderedExperiences = async (req, res, next) => {

    // query
    const { sort, fromDate, toDate
    } = req.query

    // array de ordenamiento de sequelize
    let arrSorts = [];
    function array (sort) {
        if (sort) {
            if (sort === 'nameDESC') return ['firstName', 'DESC']
            if (sort === 'nameASC') return ['firstName', 'ASC']
        } 
        return ['idExperience', 'DESC']
    }
    arrSorts = array(sort)

    try {

        let experiences = await Experience.findAll({
            include: { 
                model: Booking,
                attributes: ['startDate', 'endDate'],
                include: [{
                    model: Bike,
                    attributes: ['name'],
                }] 
            },

            order: [arrSorts],
        });

        if(experiences.length && fromDate != 'null' && toDate != 'null') {
            // filtro de fecha
            experiences = experiences.filter(experience => {
                let show = false
                if ((experience.booking.startDate <= toDate && 
                    experience.booking.startDate >= fromDate)) show = true
                return show
            })
            
            // experiences a renderizar
            if(experiences.length) res.send(experiences)
            else res.send('nothing')
        }
        else {
            if(experiences.length) res.send(experiences)
            else res.send('nothing')  
        }
        
    } catch (error) {

        next(error)

    }
};

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
};

// crea una experiencia, necesita recibir ID de booking
async function createExperience(req, res, next) {
    let { imgExperience, textExperience, bookingIdBooking, firstName, email } = req.body
    if(!textExperience && !bookingIdBooking && !firstName) res.send({ msg: 'faltan datos' })
    try {
        const post = await Experience.create({
            imgExperience,
            textExperience,
            bookingIdBooking,
            firstName, 
            email
        });
        res.send(post)
    } catch (error) {
        next(error)
    }
};

// crea una experiencia y la procesa con la api GPT
async function createExperienceWithApiGPT(req, res, next) {
    let { imgExperience, textExperience, bookingIdBooking, firstName, email } = req.body
    // if(!textExperience && !bookingIdBooking && !firstName) res.send({ msg: 'faltan datos' })
    try {
        const prompt = getExperiencePrompt(textExperience)
        const gptResponse = await getApiGPTresponse(prompt)
        // const post = await Experience.create({
        //     imgExperience,
        //     textExperience,
        //     bookingIdBooking,
        //     firstName, 
        //     email
        // });
        // res.send(post)
        res.send(gptResponse)
    } catch (error) {
        next(error)
    }
};

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
        }else res.send({ e:'Experiencia no existe' })

    } catch (error) {
        next(error)
    }
};

//obtener todas las bicis favoritas de un usuario
const getAllLikes = async (req, res, next) =>{
    const {email} = req.params
    try {
        const allLikes = await Experience.findAll({
            include: [{
                model: User,
                through: { attributes: [] },
                attributes:['email'],
                where:{email:email}
            }]
        })
        res.send(allLikes)
    } catch (error) {
        res.send(error.message)
    }
}

//agregar bicis favoritas a un usuario
const postLike = async (req, res, next) => {
    const {idExperience, email} = req.body;
    try {
        const likeExperience = await Experience.findOne({
            where: { idExperience: idExperience }
        })
        const user = await User.findOne({
            where: { email: email }
        })
        await user.addExperience(likeExperience)
        res.send(likeExperience)
    } catch (error) {
        res.send(error.message)
    }
}

//borrar bicis de favoritas
const deleteLike = async (req, res, next) => {
    const {idExperience, email} = req.body;
    try {
        const likeExperience = await Experience.findOne({
            where: { idExperience: idExperience }
        })
        const user = await User.findOne({
            where: { email: email }
        })
        await user.removeExperience(likeExperience);
        res.send(likeExperience)
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = {experienceDetails, createExperience, createExperienceWithApiGPT, updateExperience, allExperiences, getRenderedExperiences, getAllLikes, postLike, deleteLike}