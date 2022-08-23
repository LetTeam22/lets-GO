import React from "react"
import { Link } from 'react-router-dom';
import imgDefault from '../images/game.webp'
import imgRat0 from '../images/0stars.png'
import imgRat05 from '../images/0.5star.png'
import imgRat1 from '../images/1star.png'
import imgRat15 from '../images/1.5stars.png'
import imgRat2 from '../images/2stars.png'
import imgRat25 from '../images/2.5stars.png'
import imgRat3 from '../images/3stars.png'
import imgRat35 from '../images/3.5stars.png'
import imgRat4 from '../images/4stars.png'
import imgRat45 from '../images/4.5stars.png'
import imgRat5 from '../images/5stars.png'
import '../styles/VideogameCard.css'

function VideogameCard({id, name, image, rating, genres, platforms}) {
  
  const imgRating = rat => {
    if (rat < 0.25) return imgRat0
    if (rat < 0.75) return imgRat05
    if (rat < 1.25) return imgRat1
    if (rat < 1.75) return imgRat15
    if (rat < 2.25) return imgRat2
    if (rat < 2.75) return imgRat25
    if (rat < 3.25) return imgRat3
    if (rat < 3.75) return imgRat35
    if (rat < 4.25) return imgRat4
    if (rat < 4.75) return imgRat45
    return imgRat5
  } 

  return (

    <div className='card' key={id}>

      <Link to={`/videogame/${id}`}>

        <div className="cardNameContainer">
          <span className="cardName">{name}</span>
        </div>

        {/* <div className="cardImageContainer"> */}
          {image ? <img className="cardImage" src={image} alt={name} /> : <img className="cardImage" src={imgDefault} alt={name} />}
        {/* </div> */}

        <div className="ratingContainer">
          {
            rating !== 'Not rated' && 
            <img className="ratingImg" src={imgRating(rating)} alt='R '/>
          }
          <span className="rating">{rating}</span>
        </div>

        <div className="genreContainer">
          {
            genres.length > 0 ? 
            [...genres].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).slice(0, 6).map((g, i) => {
              return (
                <span className='genre' key={g.name}>{g.name}</span>
                )
              }) :
            <div className="noneAssigned">(No genres assigned)</div>
          }
        </div>

      </Link>

    </div>

  )
}

export default VideogameCard