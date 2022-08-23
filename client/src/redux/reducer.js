import { 
  GET_VIDEOGAMES_ALL,
  GET_VIDEOGAMES_SEARCHED,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  MODIFY_SORTS,
  MODIFY_SORTS_VALUES,
  MODIFY_FILTERS,
  MODIFY_FILTERS_VALUES,
  SET_VIDEOGAMES_RENDERED,
  SET_SEARCH_VALUE,
  SET_PAGE_NUMBER,
  SET_VIDEOGAMES_SEARCHED,
  SET_LAST_SEARCH,
  SET_VIDEOGAMES_ALL,
  SET_VIDEOGAME_DETAIL
} from "./actions";

const initialState = {
  videogamesAll: [],
  videogamesSearched: [],
  videogameDetail: [],
  genres: [],
  sorts: [],
  sortsValues: {name: 'none', rating: 'none'},
  filters: [],
  filtersValues: {genre: 'none', origin: 'none'},
  videogamesRendered: [],
  searchValue: '',
  pageNumber: 1,
  videogamesPerPage: 15,
  lastSearch: '',
}

function reducer(state = initialState, {type, payload}) {

  switch (type) {

    case GET_VIDEOGAMES_ALL:
      return {
        ...state,
        videogamesAll: payload,
        videogamesRendered: payload
      }

    case GET_VIDEOGAMES_SEARCHED:
      return {
        ...state,
        videogamesSearched: payload,
      }

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload
      }

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      }

    case MODIFY_SORTS:
      return {
        ...state,
        sorts: payload
      }

    case MODIFY_SORTS_VALUES:
      return {
        ...state,
        sortsValues: payload
      }

    case MODIFY_FILTERS:
      return {
        ...state,
        filters: payload
      }

    case MODIFY_FILTERS_VALUES:
      return {
        ...state,
        filtersValues: payload
      }

    case SET_VIDEOGAMES_RENDERED:
      return {
        ...state,
        videogamesRendered: payload
      }

    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload
      }

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: payload
      }

    case SET_VIDEOGAMES_SEARCHED:
      return {
        ...state,
        videogamesSearched: payload
      }

    case SET_LAST_SEARCH:
      return {
        ...state,
        lastSearch: payload
      }
    
    case SET_VIDEOGAMES_ALL:
      return {
        ...state,
        videogamesAll: payload
      }

    case SET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload
      }

    default: return state

  }
}

export default reducer;