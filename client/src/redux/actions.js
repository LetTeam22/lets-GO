import axios from 'axios'

export const GET_VIDEOGAMES_ALL = 'GET_VIDEOGAMES_ALL'
export const GET_VIDEOGAMES_SEARCHED = 'GET_VIDEOGAMES_SEARCHED'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_GENRES = 'GET_GENRES'
export const MODIFY_SORTS = 'MODIFY_SORTS'
export const MODIFY_SORTS_VALUES = 'MODIFY_SORTS_VALUES'
export const MODIFY_FILTERS = 'MODIFY_FILTERS'
export const MODIFY_FILTERS_VALUES = 'MODIFY_FILTERS_VALUES'
export const SET_VIDEOGAMES_RENDERED = 'SET_VIDEOGAMES_RENDERED'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'
export const SET_VIDEOGAMES_SEARCHED = 'SET_VIDEOGAMES_SEARCHED'
export const SET_LAST_SEARCH = 'SET_LAST_SEARCH'
export const SET_VIDEOGAMES_ALL = 'SET_VIDEOGAMES_ALL'
export const SET_VIDEOGAME_DETAIL = 'SET_VIDEOGAME_DETAIL'

export function getVideogamesAll() {
  return (dispatch) => {
    return axios('http://localhost:3001/videogames')
    .then(res => dispatch({type: GET_VIDEOGAMES_ALL, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export function getVideogamesSearched(name) {
  return async (dispatch) => {
    try {   
      let videogames = await axios(`http://localhost:3001/videogames?name=${name}`)
      return dispatch({type: GET_VIDEOGAMES_SEARCHED, payload: videogames.data})
    } catch (error) {
      console.log(error)
    }
  }
} 

export function getVideogameDetail(id) {
  return (dispatch) => {
    return axios(`http://localhost:3001/videogame/${id}`)
    .then(res => dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export function postVideogame(values) {
  return (dispatch) => {
    return axios.post('http://localhost:3001/videogames', values)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
}

export function deleteVideogame(id) {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/videogame/${id}`)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
}

export function updateVideogame(id, values) {
  return (dispatch) => {
    return axios.put(`http://localhost:3001/videogame/${id}`, values)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
}

export function getGenres() {
  return (dispatch) => {
    return axios('http://localhost:3001/genres')
    .then(res => dispatch({type: GET_GENRES, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export function modifySorts(payload) {
  return {
    type: MODIFY_SORTS,
    payload: payload
  }
}

export function modifySortsValues(payload) {
  return {
    type: MODIFY_SORTS_VALUES,
    payload: payload
  }
}

export function modifyFilters(payload) {
  return {
    type: MODIFY_FILTERS,
    payload: payload
  }
}

export function modifyFiltersValues(payload) {
  return {
    type: MODIFY_FILTERS_VALUES,
    payload: payload
  }
}

export function setVideogamesRendered(payload) {
  return {
    type: SET_VIDEOGAMES_RENDERED,
    payload: payload
  }
}

export function setSearchValue(payload) {
  return {
    type: SET_SEARCH_VALUE,
    payload: payload
  }
}

export function setPageNumber(payload) {
  return {
    type: SET_PAGE_NUMBER,
    payload: payload
  }
}

export function setVideogamesSearched(payload) {
  return {
    type: SET_VIDEOGAMES_SEARCHED,
    payload: payload
  }
}

export function setLastSearch(payload) {
  return {
    type: SET_LAST_SEARCH,
    payload: payload
  }
}

export function setVideogamesAll(payload) {
  return {
    type: SET_VIDEOGAMES_ALL,
    payload: payload
  }
}

export function setVideogameDetail(payload) {
  return {
    type: SET_VIDEOGAME_DETAIL,
    payload: payload
  }
}


