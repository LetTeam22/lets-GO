const axios = require('axios');
const { getVideogamesFromDB } = require('./videogamesControllers');
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogameByID(req, res, next) {
  const { idVideogame } = req.params
  if (idVideogame) {
    try {
      let videogamesDB = await getVideogamesFromDB()
      let videogame = await videogamesDB.filter(v => v.id === idVideogame)
      if (!videogame.length) {
        let urlApiID = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}` 
        let videogameApi = (await axios(urlApiID)).data
        videogame = [
          {
            id: videogameApi.id, 
            name: videogameApi.name,
            image: videogameApi.background_image, 
            description: videogameApi.description,
            released: videogameApi.released,
            rating: videogameApi.ratings.length > 0 ? videogameApi.rating : 'Not rated',
            genres: videogameApi.genres.map(g => g),
            platforms: videogameApi.platforms.map(p => p.platform.name).join(),
            website: videogameApi.website
          }
        ]
      }
      res.json(videogame)
    } catch (error) {
      res.send(`Videogame id ${idVideogame} not found`)
    }
  }
}

async function deleteVideogame(req, res, next) {
  const { idVideogame } = req.params
  if (idVideogame) {
    try {
      let vgRowsDeleted = await Videogame.destroy({ where: { id: idVideogame }})
      res.send(`Videogame deleted from db. Row(s): ${vgRowsDeleted}`)
    } catch (error) {
      next(error)
    }
  }
}

async function updateVideogame(req, res, next) {
  const { idVideogame } = req.params
  const { name, description, image, released, rating, genres, platforms, createdInDb } = req.body
  if (idVideogame) {
    try {
      const videogame = await Videogame.findByPk(idVideogame)
      if (videogame) {
        const nameDB = name[0].toUpperCase() + name.substring(1)
        const descriptionDB = '<p>'.concat(description).concat('</p>')
        const ratingDB = rating === '' ? 'Not rated' : rating
        let videogameData = { name: nameDB, description: descriptionDB, image, released, rating: ratingDB, platforms, createdInDb }
        let genreDb = await Genre.findAll({
          where: {
            name: genres
          } 
        })
        let videogameUpdated = await videogame.update(videogameData)
        videogameUpdated.setGenres(genreDb)
        res.send(`Videogame ${name} updated in db`)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  getVideogameByID,
  deleteVideogame,
  updateVideogame
}