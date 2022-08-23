import React from "react"
import {useDispatch, useSelector} from 'react-redux'
import '../styles/Paginate.css'
import {setPageNumber} from '../redux/actions'

function Paginate() {
  
  const videogamesRendered = useSelector(state => state.videogamesRendered)
  const videogamesPerPage = useSelector(state => state.videogamesPerPage)
  const pageNumber = useSelector(state => state.pageNumber)

  const dispatch = useDispatch()

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(videogamesRendered.length/videogamesPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePaginate = num => {
    dispatch(setPageNumber(num))
  }

  const handlePrevious = () => {
    if (pageNumber > 1) dispatch(setPageNumber(pageNumber - 1))
  }
  
  const handleNext = () => {
    if (pageNumber < pageNumbers[pageNumbers.length - 1]) dispatch(setPageNumber(pageNumber + 1))
  }

  return (
    <nav>
        { 
          pageNumbers.length > 0 &&
          <ul className="paginate">
              {pageNumbers.length > 1 && <li className="arrow" onClick={() => handlePrevious()}>{'<'}</li>}
              {
                pageNumbers.map(num => {
                  return (
                    <li className={num === pageNumber ? "numSelected" : "num"} key={num} onClick={() => handlePaginate(num)}>
                    <span>{num}</span>
                    </li>
                  )
                })
              }
              {pageNumbers.length > 1 && <li className="arrow" onClick={() => handleNext()}>{'>'}</li>}
          </ul>
        }
    </nav>
  )
}

export default Paginate