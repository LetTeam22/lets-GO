import React from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getVideogamesSearched, setSearchValue, setPageNumber, setVideogamesSearched, setLastSearch} from '../redux/actions'
import '../styles/SearchBar.css'


function SearchBar() {

  const searchValue = useSelector(state => state.searchValue)
  
  const dispatch = useDispatch()
  
  const handleInputChange = e => {
    e.preventDefault()
    dispatch(setSearchValue(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setVideogamesSearched([]))
    dispatch(getVideogamesSearched(searchValue))
    dispatch(setPageNumber(1))
    dispatch(setLastSearch(searchValue))
    dispatch(setSearchValue(''))
  }

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input className='input' type='text' placeholder='Search...' value={searchValue} onChange={handleInputChange} />
      {/* <button className='btnSearch' type='submit'>Go!</button> */}
      <button className='btnGlass' type='submit'></button>
    </form>
  )
}

export default SearchBar