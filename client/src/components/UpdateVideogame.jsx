import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {updateVideogame, getGenres, setVideogamesAll, setVideogameDetail} from '../redux/actions'
import '../styles/CreateVideogame.css'

function UpdateVideogame() {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const initialMount = useRef(true)
  const genres = useSelector(state => state.genres)
  const videogameDetail = useSelector(state => state.videogameDetail)
  const [errors, setErrors] = useState({})
  const [enabled, setEnabled] = useState(true)
  
  const [input, setInput] = useState({
    name: videogameDetail[0].name,
    description: videogameDetail[0].description.replace('<p>','').replace('</p>',''),
    image: videogameDetail[0].image,
    released: videogameDetail[0].released,
    rating: videogameDetail[0].rating === 'Not rated' ? '' : videogameDetail[0].rating,
    genres: videogameDetail[0].genres ? videogameDetail[0].genres.map(g => g.name) : [],
    platforms: videogameDetail[0].platforms
  })
  
  useEffect(() => loadCreateData(), [dispatch])     // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => validateInput(), [input])         // eslint-disable-line react-hooks/exhaustive-deps

  const loadCreateData = () => {
    if (genres.length === 0) dispatch(getGenres())
  }
  
  function validateInput() {
    if (initialMount.current) return initialMount.current = false
    let newErrors = {}
    if (!input.name) newErrors.name = 'Please add a name'
    if (!input.description) newErrors.description = 'Please add a description'
    let valImage = isValidImage(input.image)
    if (valImage !== true) newErrors.image = 'Image URL must have a valid format:|http(s):// + .png/.jpg/.gif'
    let valReleased = isValidDate(input.released)
    if (valReleased !== true) newErrors.released = valReleased
    if (input.rating < 0 || input.rating > 5) newErrors.rating = 'Rating must be a number between 0 and 5'
    if (input.genres.length === 0) newErrors.genres = 'Please add at least one genre'
    if (!input.platforms) newErrors.platforms = 'Please add at least one platform'
    if (Object.keys(newErrors).length === 0) setEnabled(true)
    else setEnabled(false)
    setErrors(newErrors)
  } 

  function isValidDate(dateString) {
    if (dateString !== '') {
      const regEx = /^\d{4}-\d{2}-\d{2}$/
      if(!dateString.match(regEx)) return 'Released date must be in format yyyy-mm-dd'
      const d = new Date(dateString)
      const dNum = d.getTime()
      if(!dNum && dNum !== 0) return 'Please add a valid date'
      const dateLocalTZ = dateString + 'T00:00:00.000-03:00'
      const dLocal = new Date(dateLocalTZ)
      const today = new Date()
      const difDays = Math.ceil((dLocal - today) / (1000 * 60 * 60 * 24))
      if (difDays > 0) return "Released date can't be greater than today"
    }
    return true
  }

  function isValidImage(urlString) {
    return urlString === '' ? true : /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
  }

  const handleInputChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSelectGenre = e => {
    if (e.target.value !== 'none' && !input.genres.includes(e.target.value)) setInput({...input, genres: [...input.genres, e.target.value]}) 
  }

  const handleSelectPlatform = e => {
    if (e.target.value !== 'none' && !input.platforms.split(',').includes(e.target.value)) setInput({...input, platforms: input.platforms.length > 0 ? input.platforms.concat(`,${e.target.value}`) : e.target.value})
  }

  const handleDeleteGenre = name => {
    setInput({...input, genres: input.genres.filter(g => g !== name)})
  }

  const handleDeletePlatform = name => {
    setInput({...input, platforms: input.platforms.split(',').filter(p => p !== name).join()})
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!enabled) {
      if (Object.keys(errors).length === 0) {
        return alert(`Please complete the form first with your videogame data`)
      } else {
        for (const err in errors) {
          return alert(errors[err])
        }
      }
    }
    dispatch(updateVideogame(videogameDetail[0].id, input))
    dispatch(setVideogamesAll([]))
    dispatch(setVideogameDetail([]))
    alert(`Videogame ${input.name} updated!`)
    history.push('/home')
  }

  return (

    <div className='createContainer'>
      
      <Link to='/home'>
        <div className='btnHomeCreate'>Back to home</div>
      </Link>

      <h2 className='titleCreate'>Create your videogame!</h2>

      <div className='formContainer' onSubmit={handleSubmit}>

        <form className='form'>

          <div className='formData'>

            <div className='column1'>

              <div className='nameContainer'>
                <label>Name: </label>
                <input className={errors.name ? 'nameInputError' : 'nameInput'} type='text' value={input.name} name='name' onChange={handleInputChange} />
                {errors.name && <p className='error'>{errors.name}</p>}
              </div>

              <div className='descContainer'>
                <label>Description: </label>
                <textarea className={errors.description ? 'descAreaError' : 'descArea'} type='text' value={input.description} name='description' onChange={handleInputChange} />
                {errors.description && <p className='error'>{errors.description}</p>}
              </div>

              <div className='imageContainer'>
                <label>Image URL: </label>
                <input className='imgURL' type='text' value={input.image} name='image' onChange={handleInputChange} />
                {errors.image && <p className='error'>{errors.image.split('|')[0]}<br></br>{errors.image.split('|')[1]}</p>}
              </div>

            </div>

            <div className='column2'>

              <div className='dateContainer'>
                <label>Released date: </label>
                <input className={errors.released ? 'dateInputError' : 'dateInput'} type='text' value={input.released} name='released' onChange={handleInputChange} />
                {errors.released && <p className='error'>{errors.released}</p>}
              </div>

              <div className='ratContainer'>
                <label>Rating: </label>
                <input className={errors.rating ? 'ratInputError' : 'ratInput'} type='number' min='0' max='5' step='0.1' value={input.rating} name='rating' onChange={handleInputChange} />
                {errors.rating && <p className='error'>{errors.rating}</p>}
              </div>

            </div>

            <div className='column3'>

              <div className='dropContainer'>
                <select className={errors.genres ? 'selClassError' : 'selClass'} name='genre' onChange={handleSelectGenre}>
                  <option value='none'>Select genres</option>
                  {
                    genres.map(g => {
                      return (
                        <option value={g.name} key={g.name}>{g.name}</option>
                        )
                      })
                    }
                </select>
                {errors.genres && <p className='error'>{errors.genres}</p>}
                <div className='selContainer'>
                  {input.genres.map(g => {
                    return (
                      <div className='selGroupGen' key={g}>
                        <span>{g}</span>
                        <button className='btnXGen' onClick={() => handleDeleteGenre(g)}>X</button> 
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='dropContainer'>
                <select className={errors.platforms ? 'selClassError' : 'selClass'} name='platform' onChange={handleSelectPlatform}>
                  <option value='none'>Select platforms</option>
                  <option value='Android'>Android</option>
                  <option value='Game Boy'>Game Boy</option>
                  <option value='GameCube'>GameCube</option>
                  <option value='iOS'>iOS</option>
                  <option value='macOS'>macOS</option>
                  <option value='Nintendo 64'>Nintendo 64</option>
                  <option value='Nintendo DS'>Nintendo DS</option>
                  <option value='Nintendo Switch'>Nintendo Switch</option>
                  <option value='PC'>PC</option>
                  <option value='PlayStation'>PlayStation</option>
                  <option value='PlayStation 2'>PlayStation 2</option>
                  <option value='PlayStation 3'>PlayStation 3</option>
                  <option value='PlayStation 4'>PlayStation 4</option>
                  <option value='PlayStation 5'>PlayStation 5</option>
                  <option value='PSP'>PSP</option>
                  <option value='SEGA Saturn'>SEGA Saturn</option>
                  <option value='Wii'>Wii</option>
                  <option value='Xbox 360'>Xbox 360</option>
                  <option value='Xbox One'>Xbox One</option>
                </select>
                {errors.platforms && <p className='error'>{errors.platforms}</p>}
                <div className='selContainer'>
                  {input.platforms && input.platforms.split(',').map(p => {
                    return (
                      <div className='selGroupPlat' key={p}>
                        <span>{p}</span>
                        <button className='btnXPlat' onClick={() => handleDeletePlatform(p)}>X</button> 
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          
          </div>

          <div className='btnCreateContainer'>
            <button className={enabled ? 'btnUpdateEnabled' : 'btnUpdateDisabled'} type='submit'>Update</button>
          </div>

        </form>

      </div>

    </div>

  )
}
  
export default UpdateVideogame