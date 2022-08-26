import { CURRENT_PAGE, GET_BIKES } from '../actions/actiontypes';


const  initialState = {
    currentPage: 1,
    allBikes: [],
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

        default: return state
    }
}


export default rootReducer;