const { Contact } = require ('../db');
const { getApiGPTresponse, getContactPrompt } = require('./gpt/apiGPTControllers.js');
const { getSummaryPrompt, getSentimentPrompt, getLanguagePrompt, getTranslationPrompt, getReplyPrompt } = require('./gpt/prompt.js');

// guarda el msj del form de contacto en la db
async function saveContactMessage(req, res, next) {
    let { name, phone, email, message} = req.body
    try {
        const post = await Contact.create({
            name,
            phone,
            email,
            message,
        });
        let msj = 'Muchas gracias por comunicarse con lets GO! Esperamos que vuelvas a visitarnos pronto'
        res.send(msj)
    } catch (error) {
        next(error)
    }
};

// guarda el msj del form de contacto y lo procesa con la apiGPT
async function saveContactMessageGPT(req, res, next) {
    let { name, phone, email, message} = req.body
    try {
        const summaryPrompt = getSummaryPrompt(message)
        const sentimentPrompt = getSentimentPrompt(message)
        const languagePrompt = getLanguagePrompt(message)
        const replyPrompt = getReplyPrompt(message)
        const [summary, sentiment, language, reply] = await Promise.all([getApiGPTresponse(summaryPrompt, 0, 200), getApiGPTresponse(sentimentPrompt, 0, 200), getApiGPTresponse(languagePrompt, 0, 200), getApiGPTresponse(replyPrompt, 0, 200)])
        const translation = language === 'Español.' ? 'N/A' : await getApiGPTresponse(getTranslationPrompt(message), 0, 200)
        const post = await Contact.create({
            name,
            phone,
            email,
            message,
            summary,
            sentiment,
            language: language.substring(0,language.length - 1),
            translation,
            reply
        });
        let msjNegative = 'Lamentamos el inconveniente, nos contactaremos a la brevedad.'
        let msjPositive = 'Muchas gracias por comunicarse con lets GO! Esperamos que vuelvas a visitarnos pronto.'
        let response 
        sentiment === 'Negativo' ? response = msjNegative : response = msjPositive
        res.send(response)
    } catch (error) {
        next(error)
    }
};

async function allContacts(req, res, next) {
    try {
        const contacts = await Contact.findAll();
        console.log(contacts)
        if(contacts.length) return res.send(contacts)
        else return res.send('nothing')      
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = {
    saveContactMessage,
    saveContactMessageGPT,
    allContacts
}