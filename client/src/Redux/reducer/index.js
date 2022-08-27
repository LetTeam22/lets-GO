import { CURRENT_PAGE, GET_BIKES, TYPE_FILTER, TRACTION_FILTER } from '../actions/actiontypes';


const  initialState = {
    currentPage: 1,
    allBikes: [],
    // filters
    useFilters: {type: false, traction: false, wheeelSize: false, color: false, name: false },
    type: [],
    traction: [],
    wheeelSize: [],
    color: [],
    name: [],

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
            case TYPE_FILTER:
                return {
                    ...state,
                    type: action.payload,
                    useFilters: {...state.useFilters, type: true }
                }
            case TRACTION_FILTER:
                return {
                    ...state,
                    traction: action.payload,
                    useFilters: {...state.useFilters, traction: true }
                }
                    
        default: return state
    }
}


export default rootReducer;