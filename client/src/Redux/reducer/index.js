import { CURRENT_PAGE, GET_BIKES, GET_BIKES_DETAIL } from '../actions/actiontypes';


const  initialState = {
    currentPage: 1,
    allBikes: [],
    bikeDetail:[],
}

function rootReducer(state = initialState, action){
    switch (action.type) {

            case CURRENT_PAGE:
                return {
                ...state,
                currentPage: action.payload
                }
            case GET_BIKES:
                return {
                    ...state,
                    allBikes: action.payload
                }
            case GET_BIKES_DETAIL:
                return {
                    ...state,
                    bikeDetail: action.payload
                }

        default: return state
    }
}


export default rootReducer;