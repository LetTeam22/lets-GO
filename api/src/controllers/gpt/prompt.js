const promptPrueba = `Hola, como estás?`

const getExperiencePrompt = expText => {
    return `A partir del siguiente texto crea un resumen de máximo 4 palabras: ${expText} `
}


module.exports = {
    promptPrueba,
    getExperiencePrompt
};