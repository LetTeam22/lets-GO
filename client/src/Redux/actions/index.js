import axios from 'axios';
import { GET_BIKES } from './actiontypes'


export const getBikes = () => {
    return dispatch => axios('http://localhost:3001/bikes')
    .then(res => dispatch({ type: GET_BIKES, payload: res.data }))
    .catch(err => console.log(err));
};


