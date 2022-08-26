import { GET_BIKES } from '../actions/actiontypes';


const  initialState = {
    bikes: [],
    bikesDetail: {}
}

function rootReducer(state = initialState, action){
    switch (action.type) {

            case GET_BIKES:
                return {
                    ...state,
                    bikes: action.payload
                }

        default: return state
    }
}


export default rootReducer;