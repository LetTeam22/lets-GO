const axios = require('axios');
const { Genre } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

// GET GENRES
async function getAllGenres() {
  try {
    let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
    .map(g => ({id: g.id, name: g.name}))
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    await Genre.bulkCreate(genres)
    console.log('Generos cargados en DB correctamente')
  } catch (error) {
    console.log(error)
  }
}

function getGenresFromDB(req, res, next) {
  Genre.findAll()
  .then(genres => res.send(genres))
  .catch(e => next(e))
}

module.exports = {
  getAllGenres,
  getGenresFromDB
}

