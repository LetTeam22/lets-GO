const axios = require('axios');
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogamesFromApi(name) {

  let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`
  let urlApiSearch = `${urlApi}&search=${name}`

  let videogamesApi = []
  if (!name) {
    for (let i = 1; i <= 5; i++) {
      let videogamesEndpoint = (await axios(urlApi)).data
      videogamesApi = [...videogamesApi, ...videogamesEndpoint.results]
      urlApi = videogamesEndpoint.next
    }
  } else {
    videogamesApi = (await axios(urlApiSearch)).data.results.slice(0,15)
  }
  let videogamesApiMapped = videogamesApi.map(v => {
      return {
        id: v.id, 
        name: v.name,
        image: v.background_image, 
        released: v.released,
        rating: v.ratings.length > 0 ? v.rating : 'Not rated',
        genres: v.genres ? v.genres.map(g => g) : [],
        platforms: v.platforms ? v.platforms.map(p => p.platform.name).join() : ''
      }
    })

  return videogamesApiMapped
  
}

async function getVideogamesFromDB() {
  let videogamesDB = await Videogame.findAll({
    include: [{
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  })
  return videogamesDB.reverse()
}

async function getAllVideogames(name) {
  let vgApi = await getVideogamesFromApi(name)
  let vgDB = await getVideogamesFromDB()
  return vgDB.concat(vgApi)
}

async function getVideogames(req, res, next) {
  const { name } = req.query
  try {
    let videogames = await getAllVideogames(name)
    if (name) videogames = videogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (!videogames.length) return res.send('Videogame not found')
    res.send(videogames)
  } catch (error) {
    next(error)
  } 
}

async function postVideogame(req, res, next) {
  const { name, description, image, released, rating, genres, platforms, createdInDb } = req.body
  if (!name || !description || !genres.length || !platforms) return res.sendStatus(400)
  try {
    const nameDB = name[0].toUpperCase() + name.substring(1)
    const descriptionDB = '<p>'.concat(description).concat('</p>')
    const ratingDB = rating === '' ? 'Not rated' : rating
    let videogame = { name: nameDB, description: descriptionDB, image, released, rating: ratingDB, platforms, createdInDb }
    let videogameCreated = await Videogame.create(videogame)
    let genreDb = await Genre.findAll({
      where: {
        name: genres
      } 
    })
    videogameCreated.addGenre(genreDb)
    res.send(`Videogame ${name} created`)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVideogamesFromDB,
  getVideogames,
  postVideogame
}