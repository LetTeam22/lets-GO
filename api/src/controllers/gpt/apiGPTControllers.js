const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


const getApiGPTresponse = async (prompt, temperature, max_tokens) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature,
        max_tokens
    });
    const finalResponse = response.data.choices[0].text.substring(1)
    return finalResponse
}


module.exports = {
    getApiGPTresponse,
}