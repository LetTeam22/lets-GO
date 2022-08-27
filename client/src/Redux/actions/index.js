import axios from 'axios';
import { CURRENT_PAGE, GET_BIKES, GET_BIKES_DETAIL } from './actiontypes'


export const changeCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: CURRENT_PAGE, payload})
    }
};

export const getBikes = () => {
    return dispatch => axios('http://localhost:3001/bikes')
    .then(res => dispatch({ type: GET_BIKES, payload: res.data }))
    .catch(err => console.log(err));
};

// export const setSearchBike = payload => {
//     return dispatch => {
//         dispatch({ type: SEARCH_BIKE, payload })
//     }
// };

export const getBikeDetail = (bikeId) => {
    return dispatch => axios(`http://localhost:3001/bikes/${bikeId}`)
    .then(res => dispatch({ type: GET_BIKES_DETAIL, payload: res.data }))
    .catch(err => console.log(err));
}