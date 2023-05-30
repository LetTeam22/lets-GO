const {Contact} = require ('../db.js');
const { getApiGPTresponse, getContactPrompt } = require('./gpt/apiGPTControllers.js');
const { getSummaryPrompt, getSentimentContactPrompt, getLanguagePrompt, getTranslationPrompt } = require('./gpt/prompt.js');

// guarda el msj del form de contacto en la db
async function saveContactMessage(req, res, next) {
    let { name, phone, email, message} = req.body
    // if(!message) res.send({ msg: 'faltan datos' })
    try {
        const post = await Contact.create({
            name,
            phone,
            email,
            message,
        });
        res.send(post)
    } catch (error) {
        next(error)
    }
};

// guarda el msj del form de contacto y lo procesa con la apiGPT
async function saveContactMessageGPT(req, res, next) {
    let { name, phone, email, message} = req.body
    // if(!message) res.send({ msg: 'faltan datos' })
    try {
        const summaryPrompt = getSummaryPrompt(message)
        const sentimentPrompt = getSentimentContactPrompt(message)
        const languagePrompt = getLanguagePrompt(message)
        const [summary, sentiment, language] = await Promise.all([getApiGPTresponse(summaryPrompt, 0, 200), getApiGPTresponse(sentimentPrompt, 0, 200), getApiGPTresponse(languagePrompt, 0, 200)])
        const translation = language === 'Español.' ? 'N/A' : await getApiGPTresponse(getTranslationPrompt(textExperience), 0, 200)
        const post = await Contact.create({
            name,
            phone,
            email,
            message,
            summary,
            sentiment: sentiment.substring(0,sentiment.length - 1),
            language: language.substring(0,language.length - 1),
            translation,
        });
        res.send(post)
    } catch (error) {
        next(error)
    }
};

module.exports = {saveContactMessage, saveContactMessageGPT}