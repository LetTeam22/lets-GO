import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getVideogamesAll, getGenres, modifySorts, modifySortsValues, modifyFilters, modifyFiltersValues, setVideogamesRendered, setPageNumber, setVideogamesSearched, setLastSearch} from '../redux/actions'
import {Link} from 'react-router-dom'
import VideogameCard from './VideogameCard'
import Paginate from './Paginate'
import SearchBar from './SearchBar'
import '../styles/Home.css'
import gifLoading from '../images/pacman.gif'
import imgNotFound from '../images/pacmanSad.png'

function Home() {
  
  const dispatch = useDispatch()
  const videogamesAll = useSelector(state => state.videogamesAll)
  const videogamesSearched = useSelector(state => state.videogamesSearched)
  const genres = useSelector(state => state.genres)
  const sorts = useSelector(state => state.sorts)
  const sortsValues = useSelector(state => state.sortsValues)
  const filters = useSelector(state => state.filters)
  const filtersValues = useSelector(state => state.filtersValues)
  const videogamesRendered = useSelector(state => state.videogamesRendered)
  const pageNumber = useSelector(state => state.pageNumber)
  const videogamesPerPage = useSelector(state => state.videogamesPerPage)
  const lastSearch = useSelector(state => state.lastSearch)

  const positionOfLastVideogame = pageNumber * videogamesPerPage
  const indexOfFirstVideogame = positionOfLastVideogame - videogamesPerPage
  const currentVideogames = videogamesRendered.slice(indexOfFirstVideogame, positionOfLastVideogame)
  
  useEffect(() => loadHomeData(), [dispatch])     // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => applySortsFilters(), [sorts, filters, videogamesSearched])     // eslint-disable-line react-hooks/exhaustive-deps
  
  const loadHomeData = () => {
    if (videogamesAll.length === 0) dispatch(getVideogamesAll())
    if (genres.length === 0) dispatch(getGenres())
    handleReset()
  }

  const handleReload = () => {
    window.location.reload(false);
  }

  const handleReset = () => {
    document.getElementById("sortName").value = "none"
    document.getElementById("sortRating").value = "none"
    document.getElementById("filterGenre").value = "none"
    document.getElementById("filterOrigin").value = "none"
    dispatch(modifySorts([]))
    dispatch(modifySortsValues({name: 'none', rating: 'none'}))
    dispatch(modifyFilters([]))
    dispatch(modifyFiltersValues({genre: 'none', origin: 'none'}))
    dispatch(setVideogamesSearched([]))
    dispatch(setLastSearch(''))
    dispatch(setPageNumber(1))
  }

  const applySortsFilters = () => {

    if (typeof videogamesSearched === 'string') return dispatch(setVideogamesRendered([]))

    let newVideogamesRendered = [...videogamesAll]
    if (videogamesSearched.length > 0) newVideogamesRendered = [...videogamesSearched];

    [...sorts].reverse().forEach(sort => {
      if (sort === 'rating') {
        var vNotRated = newVideogamesRendered.filter(v => v.rating === 'Not rated')
        newVideogamesRendered = newVideogamesRendered.filter(v => v.rating !== 'Not rated')
      }
      if (sortsValues[sort] === 'Ascending') newVideogamesRendered.sort((a, b) => a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0)
      if (sortsValues[sort] === 'Descending') newVideogamesRendered.sort((a, b) => a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0)
      if (sort === 'rating') {
        if (sortsValues[sort] === 'Ascending') newVideogamesRendered = [...vNotRated, ...newVideogamesRendered]
        if (sortsValues[sort] === 'Descending') newVideogamesRendered = [...newVideogamesRendered, ...vNotRated]
      }
    })

    filters.forEach(filter => {
      if (filter === 'genre') newVideogamesRendered = newVideogamesRendered.filter(v => v.genres.filter(g => g.name === filtersValues.genre).length > 0)
      if (filter === 'origin' && filtersValues.origin === 'Created') newVideogamesRendered = newVideogamesRendered.filter(v => v.hasOwnProperty('createdInDb'))
      if (filter === 'origin' && filtersValues.origin === 'Api') newVideogamesRendered = newVideogamesRendered.filter(v => !v.hasOwnProperty('createdInDb'))
    })

    dispatch(setVideogamesRendered(newVideogamesRendered))
  }

  const handleSort = (property, value) => {
    let newSorts = sorts.filter(s => s !== property)
    if (value !== 'none') newSorts = [...newSorts, property]
    dispatch(modifySorts(newSorts))
    let newSortsValues = {...sortsValues}
    newSortsValues[property] = value
    dispatch(modifySortsValues(newSortsValues))
  }

  const handleSortName = e => {
    handleSort('name', e.target.value)
  }
  
  const handleSortRating = e => {
    handleSort('rating', e.target.value)
  }

  const handleFilter = (property, value) => {
    let newFilters = filters.filter(f => f !== property)
    if (value !== 'none') newFilters = [...newFilters, property]
    dispatch(modifyFilters(newFilters))
    let newFiltersValues = {...filtersValues}
    newFiltersValues[property] = value
    dispatch(modifyFiltersValues(newFiltersValues))
    dispatch(setPageNumber(1))
  }

  const handleFilterGenre = e => {
    handleFilter('genre', e.target.value)
  }
  
  const handleFilterOrigin = e => {
    handleFilter('origin', e.target.value)
  }

  const deleteLastSearch = () => {
    dispatch(setVideogamesSearched([]))
    dispatch(setLastSearch(''))
  }

  const deleteSort = s => {
    s === 'name' ? document.getElementById("sortName").value = "none" : document.getElementById("sortRating").value = "none"
    handleSort(s, 'none')
  }

  const deleteFilter = f => {
    f === 'genre' ? document.getElementById("filterGenre").value = "none" : document.getElementById("filterOrigin").value = "none"
    handleFilter(f, 'none')
  }

  return (

    <div className="mainContainer">
        
      <div className='mainButtons'>
        
        <div className='topRow'>

          <Link to='/'>
            <div className='btnLanding'>Back to Landing</div>
          </Link>

          <div>
            <button className='btnReload' onClick={handleReload}>Reload Videogames</button>
          </div>

        </div>

        <h1 className='titleHome'>Videogames App</h1>
        
        <Link to='/create'>
          <div className='btnCreate'>Create Videogame</div>
        </Link>

        <SearchBar />

        <div className='sortContainer'>
          <div>
            <select className={sortsValues.name !== "none" ? 'dropdownSel' : 'dropdown'} onChange={handleSortName} id='sortName'>
              <option value='none'>Sort by name</option>
              <option value='Ascending'>Ascending</option>
              <option value='Descending'>Descending</option>
            </select>
          </div>
          <div>
            <select className={sortsValues.rating !== "none" ? 'dropdownSel' : 'dropdown'} onChange={handleSortRating} id='sortRating'>
              <option value='none'>Sort by rating</option>
              <option value='Ascending'>Ascending</option>
              <option value='Descending'>Descending</option>
            </select>
          </div>
        </div>

        <div className='filterContainer'>
          <div>
            <select className={filtersValues.genre !== "none" ? 'dropdownSel' : 'dropdown'} onChange={handleFilterGenre} id='filterGenre'>
              <option value='none'>Filter by genre</option>
              {
                genres.map(g => {
                  return (
                    <option value={g.name} key={g.name}>{g.name}</option>
                    )
                  })
              }
            </select>
          </div>
          <div>
            <select className={filtersValues.origin !== "none" ? 'dropdownSel' : 'dropdown'} onChange={handleFilterOrigin} id='filterOrigin'>
              <option value='none'>Filter by origin</option>
              <option value='Created'>Created</option>
              <option value='Api'>Api</option>
            </select> 
          </div>
        </div>

        <div>
          <button className='btnReset' onClick={handleReset}>Reset filters</button>
        </div>

        {
          sorts.length > 0 && sorts.map((s, i) => {
            return (
            <div className='selected' key={s}>
              <span>{sorts.length === 1 ? `Sort by ${s}: ${sortsValues[s]}` : `Sort ${i + 1} by ${s}: ${sortsValues[s]}`}</span>
              <button className='btnErase' onClick={() => deleteSort(s)}>X</button>
            </div>
            )
          })
        }
        {
          filters.length > 0 && filters.map((f, i) => {
          return (
            <div className='selected' key={f}>
              <span>{filters.length === 1 ? `Filter by ${f}: ${filtersValues[f]}` : `Filter ${i + 1} by ${f}: ${filtersValues[f]}`}</span>
              <button className='btnErase' onClick={() => deleteFilter(f)}>X</button>
            </div>
            )
          })
        }
        {
          lastSearch && 
          <div className='selected' >
            <span>{`Search by name: ${lastSearch}`}</span>
            <button className='btnErase' onClick={deleteLastSearch}>X</button>
          </div>
        }

      </div>
      
      <div className='gallery'>

        {videogamesAll.length === 0 || (lastSearch && videogamesSearched.length === 0) ?
      
          <div className='loading'>
            <img className='gifLoading' src={gifLoading} alt='Loading'/> 
          </div> :
          
          <div>

            {videogamesRendered.length > 0 && <Paginate />}

            <div className='cards'>

              {
                currentVideogames.length > 0 ? currentVideogames.map(e => {
                  return (
                    <VideogameCard id={e.id} name={e.name} image={e.image} rating={e.rating} genres={e.genres} platforms={e.platforms} key={e.id}/>
                    )
                  }) :
                  <div className='notFound'>
                    <h1 className='strNotFound'>Oh no! No videogames were found</h1>
                    <img className='imgNotFound' src={imgNotFound} alt='Not found'/> 
                  </div>
              }

            </div>

          </div>

        }

      </div>

    </div>
  )
}

export default Home