import React from "react"
import {Link} from 'react-router-dom'
import '../styles/Landing.css'
 
function Landing() {
  return (
    <div className="background">
      <h1 className="title">Welcome to the videogames app!</h1>
      <Link to='/home'>
        <button className="button">GAME ON!</button>
      </Link>
    </div>
  )
}
  
export default Landing
