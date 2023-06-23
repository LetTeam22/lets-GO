// const getExperiencePrompt = expText => {
//     return `A partir del texto delimitado por comillas triples, haz las siguientes cuatro tareas:

//                 1. Crea un resumen de máximo 4 palabras.
//                 2. ¿Cuál es el sentimiento de la experiencia brindada por el usuario? Da la respuesta en una sola palabra, ya sea "Positiva" o "Negativa".
//                 3. ¿Cuál es el idioma del texto? La respuesta debe tener la primer letra en mayúscula y el resto en minúscula.
//                 4. Si el idioma no es español, traduce el texto al español. Si ya es español, la respuesta debería ser "N/A".

//                 Devuelve el resultado en formato json con las siguientes propiedades (enumeradas respectivamente):
//                 1. summary
//                 2. sentiment
//                 3. language
//                 4. translation

//                 La respuesta debe ser solo el json.

//                 '''${expText}'''
//             `
// }

// PROMPT SUMMARY FROM EXPERIENCE OR CONTACT
const getSummaryPrompt = (expText) => {
  return `A partir del texto delimitado por comillas triples, crea un resumen de máximo 4 palabras en español.

                '''${expText}''' 
            `;
};

// PROMPT SENTIMENT FROM EXPERIENCE OR CONTACT
const getSentimentPrompt = (expText) => {
  return `A partir del texto delimitado por comillas triples, identifica cuál es el sentimiento de la información brindada por el usuario y da la respuesta
            en una sola palabra, ya sea "Positivo", "Negativo" o "Neutro".

                '''${expText}''' 
            `;
};

// PROMPT LANGUAGE FROM EXPERIENCE OR CONTACT
const getLanguagePrompt = (expText) => {
  return `A partir del texto delimitado por comillas triples, identifica cuál es el idioma del texto y da la respuesta con la primer letra en mayúscula y 
            el resto en minúscula.

                '''${expText}''' 
            `;
};

// PROMPT TRANSLATION FROM EXPERIENCE OR CONTACT
const getTranslationPrompt = (expText) => {
  return `A partir del texto delimitado por comillas triples, traduce el texto al español.

                '''${expText}''' 
            `;
};

// PROMPT ADVENTURE
const getTextCorrection = (text) => {
  return `A partir del texto delimitado por comillas triples, devuelve el mismo texto en español corrigiendo ortografía y gramática. Tratar de "vos" no de "tu".

                '''${text}''' 
            `;
};

// PROMPT CONTACTO NECESITA RESPUESTA
const getReplyPrompt = (text) => {
  return `A partir del texto delimitado por comillas triples identificá si el mensaje brindado por el usuario es una consulta. Si lo es, tu respuesta debe ser una sola palabra: "true". Si no lo es, tu respuesta debe ser una sola palabra: "false"

                '''${text}''' 
            `;
};

module.exports = {
  getSummaryPrompt,
  getSentimentPrompt,
  getLanguagePrompt,
  getTranslationPrompt,
  getTextCorrection,
  getReplyPrompt,
};
