import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {getVideogameDetail, deleteVideogame, setVideogamesAll} from '../redux/actions'
import Parser from 'html-react-parser'
import imgBrokenLink from '../images/ghost.png'
import gifLoading from '../images/pacman.gif'
import '../styles/VideogameDetail.css'
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

function VideogameDetail(props) {

  const dispatch = useDispatch()
  const history = useHistory()

  const videogameDetail = useSelector(state => state.videogameDetail)
  
  useEffect(() => loadVideogameDetail(),[dispatch])      // eslint-disable-line react-hooks/exhaustive-deps

  const loadVideogameDetail = () => {
    if (videogameDetail.length === 0 || (typeof videogameDetail !== 'string' && videogameDetail[0].id.toString() !== props.match.params.id) 
      || (typeof videogameDetail === 'string' && videogameDetail.split(' ')[2] !== props.match.params.id)) dispatch(getVideogameDetail(props.match.params.id))
  }
  
  const handleDelete = () => {
    dispatch(deleteVideogame(props.match.params.id))
    dispatch(setVideogamesAll([]))
    alert(`Videogame ${videogameDetail[0].name} deleted!`)
    history.push('/home')
  }

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
    
    <div>
          
      {
        videogameDetail.length === 0 || (typeof videogameDetail !== 'string' && videogameDetail[0].id.toString() !== props.match.params.id)
          || (typeof videogameDetail === 'string' && videogameDetail.split(' ')[2] !== props.match.params.id) ?
        
        <div className='detailContainer'>
          <div className='loadingDetail'>
            <img className='gifLoadingDetail' src={gifLoading} alt='Loading'/> 
          </div>
        </div> :

        <div className={typeof videogameDetail === 'string' ? 'brokenLinkContainer' : 'detailContainer'}>

          <Link to='/home'>
            <div className='btnHomeDetail'>Back to home</div>
          </Link>

          {
            typeof videogameDetail === 'string' ? 
            
            <div className='brokenLink'>
              <h1 className='brokenLinkTitle'>Oh no! It looks like this<br></br>videogame's link doesn't exist</h1>
              <img className='brokenLinkImage' src={imgBrokenLink} alt='Not found'/> 
            </div> :

            <div className='allContainer'>

              <h1 className='titleDetail'>{videogameDetail[0].name}</h1>
              
              {
                videogameDetail[0].hasOwnProperty('createdInDb') &&
                <div className='buttonsContainer'>
                  <Link to={`/update/${videogameDetail[0].id}`}>
                    <div className='btnUpdate'>Update</div>
                  </Link>
                  <div className='btnDelete' onClick={handleDelete}>Delete</div>
                </div>
              }

              <div className='dataContainer'>

                <div className='imgDetailContainer'>
                  {videogameDetail[0].image ? <img className="imgDetail" src={videogameDetail[0].image} alt={videogameDetail[0].name} /> : <img className="imgDefault" src={imgDefault} alt={videogameDetail[0].name} />}
                </div>
                
                <div className='descriptionContainer'>
                  <h3 className='descriptionTitle'>Description</h3>
                  <div className='description'>{Parser(videogameDetail[0].description)}</div>
                </div>

              </div>

              <div className='otherDetails'>
                
                <div className='detailCol1'>
                  <h3 className='dataTitle'>Website</h3>
                  <div className='data'>{videogameDetail[0].website ? videogameDetail[0].website : '(Website not specified)'}</div>
                </div>

                <div className='detailCol1'>
                  <h3 className='dataTitle'>Released date</h3>
                  <div className='data'>{videogameDetail[0].released ? videogameDetail[0].released : '(Realeased date not specified)'}</div>
                </div>
                
                <div className='detailCol2'>
                  <h3 className='dataTitle'>Rating</h3>
                  <div className="ratingDContainer">
                    {
                      videogameDetail[0].rating !== 'Not rated' && 
                      <img className="ratingDImg" src={imgRating(videogameDetail[0].rating)} alt='R '/>
                    }
                    <span className='data ratingD'>{videogameDetail[0].rating}</span>
                  </div>
                </div>
                
                <div className='detailCol3'>
                  <h3 className='dataTitle'>Genres</h3>
                  <div className='groupContainer'>
                    {
                      videogameDetail[0].genres.length > 0 ?
                      [...videogameDetail[0].genres].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map(g => {
                        return (  
                          <span className='groupGen' key={g.name}>{g.name}</span>
                          )
                        }) :
                      <div className="data">(No genres assigned)</div>
                    }
                  </div>
                </div>
                
                <div className='detailCol4'>
                  <h3 className='dataTitle'>Platforms</h3>
                  <div className='groupContainer'>
                    {
                      videogameDetail[0].platforms.length > 0 ?
                      videogameDetail[0].platforms.split(',').sort((a, b) => a < b ? -1 : a > b ? 1 : 0).map(p => {
                        return (
                          <span className='groupPlat' key={p}>{p}</span>
                          )
                        }) :
                      <div className="data">(No platforms assigned)</div>
                    } 
                  </div>
                </div>

              </div>

            </div>
          }

        </div>
      }
    </div>
  )
}

export default VideogameDetail
