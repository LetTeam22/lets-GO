import React from "react"
import {Link} from 'react-router-dom'
import imgDeadLink from '../images/among.jpg'
import '../styles/DeadLink.css'

function DeadLink() {
  return (

    <div className="deadLinkContainer">

      <Link to='/home'>
        <div className='btnHomeDeadLink'>Back to home</div>
      </Link>

      <div className="deadLink">
        <h1 className="deadLinkTitle">Oh no! It looks like<br></br>you found a dead link</h1>
        <img className="deadLinkImage" src={imgDeadLink} alt='Dead link'/> 
      </div>

    </div>
  )
}
  
export default DeadLink