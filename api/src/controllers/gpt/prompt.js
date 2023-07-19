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
