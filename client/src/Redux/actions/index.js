import axios from 'axios';
import { CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES, GET_BIKES_DETAIL, GET_USER, CREATE_USER, LAST_URL } from './actiontypes'

export const setCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: CURRENT_PAGE, payload})
    }
};

export const setParameters = payload => {
    return dispatch => {
        dispatch({ type: SET_PARAMETERS, payload})
    }
};

export const getBikes = () => {
    return dispatch => axios('http://localhost:3001/bikes')
    .then(res => dispatch({ type: GET_BIKES, payload: res.data }))
    .catch(err => console.log(err));
};

export const getRenderedBikes = parameters => {

    const arrQuery = []
    if (parameters.filters.type) arrQuery.push(`typeFilter=${parameters.filters.type}`)
    if (parameters.filters.traction) arrQuery.push(`tractionFilter=${parameters.filters.traction}`)
    if (parameters.filters.wheelSize) arrQuery.push(`wheelSizeFilter=${parameters.filters.wheelSize}`)
    if (parameters.filters.color) arrQuery.push(`colorFilter=${parameters.filters.color}`)
    if (parameters.filters.price.min) arrQuery.push(`minPriceFilter=${parameters.filters.price.min}`)
    if (parameters.filters.price.max) arrQuery.push(`maxPriceFilter=${parameters.filters.price.max}`)
    if (parameters.filters.date.from) arrQuery.push(`fromDateFilter=${parameters.filters.date.from}`)
    if (parameters.filters.date.to) arrQuery.push(`toDateFilter=${parameters.filters.date.to}`)
    if (parameters.sorts.price) arrQuery.push(`priceSort=${parameters.sorts.price}`)
    if (parameters.sorts.rating) arrQuery.push(`ratingSort=${parameters.sorts.rating}`)
    if (parameters.sorts.name) arrQuery.push(`nameSort=${parameters.sorts.name}`)
    if (parameters.search) arrQuery.push(`search=${parameters.search}`)
    const query = !arrQuery.length ? '' : '?' + arrQuery.join('&')

    return dispatch => axios.get(`http://localhost:3001/bikes/rendered${query}`)
    .then(res => dispatch({ type: GET_RENDERED_BIKES, payload: res.data }))
    .catch(err => console.log(err));
};

export const getBikeDetail = bikeId => {
    return dispatch => axios(`http://localhost:3001/bikes/${bikeId}`)
    .then(res => dispatch({ type: GET_BIKES_DETAIL, payload: res.data }))
    .catch(err => console.log(err));
};

export const getUser = email => {
    return dispatch => axios(`http://localhost:3001/user/detail?email=${email}`)
    .then(res => dispatch({ type: GET_USER, payload: res.data}))
    .catch(err => console.log(err));
}

export const createUser = user => {
    return dispatch => axios.post('http://localhost:3001/user/create', user)
    .then(res => dispatch({type: CREATE_USER, payload: res}))
    .catch(err => console.log(err));
}

export const saveURL = url => {
    return dispatch => {
        dispatch({type: LAST_URL, payload: url})
    }
}