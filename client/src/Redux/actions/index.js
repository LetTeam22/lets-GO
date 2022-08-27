import axios from 'axios';
import { CURRENT_PAGE, GET_BIKES, GET_BIKES_DETAIL, TYPE_FILTER, TRACTION_FILTER } from './actiontypes'


export const setCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: CURRENT_PAGE, payload})
    }
};

export const getBikes = () => {
    return dispatch => axios('http://localhost:3001/bikes')
    .then(res => dispatch({ type: GET_BIKES, payload: res.data }))
    .catch(err => console.log(err));
};

export const getBikeDetail = bikeId => {
    return dispatch => axios(`http://localhost:3001/bikes/${bikeId}`)
    .then(res => dispatch({ type: GET_BIKES_DETAIL, payload: res.data }))
    .catch(err => console.log(err));
};

export const setTypeFilter = type => {
    return dispatch => axios(`http://localhost:3001/bikes/type/${type}`)
    .then(res => dispatch({ type: TYPE_FILTER, payload: res.data }))
    .catch(err => console.log(err));
};

export const setTractionFilter = traction => {
    return dispatch => axios(`http://localhost:3001/bikes/traction/${traction}`)
    .then(res => dispatch({ type: TRACTION_FILTER, payload: res.data }))
    .catch(err => console.log(err));
};

