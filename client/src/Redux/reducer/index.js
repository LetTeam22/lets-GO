import { CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES, GET_BIKES_DETAIL, GET_USER, CREATE_USER, ADD_BOOKING, POST_BOOKINGS, UPDATE_USER, GET_FAMOUS_BIKES } from '../actions/actiontypes';

const initialState = {
    allBikes: [],
    renderedBikes: [],
    paginate: {
        bikesPerPage: 9,
        currentPage: 1,
    },
    parameters: {
        filters: {
            selected: [],
            labels: [],
            ids: [],
            type: '',
            traction: '',
            wheelSize: '',
            color: '',
            price: {
                min: '',
                max: ''
            }
        },
        sorts: {
            selected: [],
            labels: [],
            ids: [],
            price: '',
            rating: '',
            name: ''
        },
        search: {
            selected: [],
            search: ''
        },
        date: {
            selected: [],
            labels: [],
            ids: [],
            from: '',
            to: ''
        }
    },
    bikeDetail: [],
    accesories: [],
    user: {},
    bookings: [],
    famousBikes: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        
            case CURRENT_PAGE:
                return {
                    ...state,
                    paginate: { ...state.paginate, currentPage: action.payload }
                }
            case SET_PARAMETERS:
                if(action.payload === 'resetAll') {
                    action.payload = {
                    filters: { selected: [], labels: [], ids: [], type: '',traction: '',wheelSize: '',color: '', price: {min: '',max: ''} },
                    sorts: { selected: [], labels: [], ids: [], price: '', rating: '', name: '' }, search: { selected: [], search: '' }, date: { selected: [], labels: [], ids: [], from: '', to: '' }
                    }
                } 
                return {
                    ...state,
                    parameters: action.payload
                }
            case GET_BIKES:
                    return {
                        ...state,
                        allBikes: action.payload
                    }
            case GET_RENDERED_BIKES:
                    return {
                        ...state,
                        renderedBikes: action.payload,
                    }
            case GET_BIKES_DETAIL:
                    return {
                        ...state,
                        bikeDetail: action.payload
                    }
            case GET_USER:
                    return {
                        ...state,
                        user: action.payload
                    }
            case CREATE_USER:
                    return {
                        ...state,
                        user: action.payload.user
                    }
            case UPDATE_USER:
                    return {
                        ...state,
                    }
            case ADD_BOOKING:
                    return {
                        ...state,
                        bookings: [...state.bookings, action.payload]
                    }
            case POST_BOOKINGS:
                    return {
                        ...state,
                        bookings: [],
                    }
            case GET_FAMOUS_BIKES: 
                const orderBikes = action.payload.sort((a, b) => {
                    if(a.rating > b.rating) return -1;
                    if(b.rating > a.rating) return 1;
                    return 0;
                });
                const principalBikes = orderBikes.slice(0, 4);
                return {
                    ...state,
                    famousBikes: principalBikes
                }

            default: return state
    }
}


export default rootReducer;

