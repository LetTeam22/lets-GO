
import { CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES, GET_BIKES_DETAIL, GET_USER, CREATE_USER, ADD_BOOKING, POST_BOOKINGS, UPDATE_USER, GET_FAMOUS_BIKES, GET_ACCESORIES, ADD_FAVORITE, REMOVE_FAVORITE, GET_ALL_BOOKINGS, GET_ALL_USERS, SET_BIKES_DETAIL, POST_EXPERIENCE, GET_ALL_EXPERIENCES, GET_DISABLED_DATES, SET_BOOKING_DATES } from '../actions/actiontypes';


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
            from: '',
            to: ''
        }
    },
    bikeDetail: [],
    accesories: [],
    user: {},
    allUsers: [],
    bookings: [],
    allBookings: [],
    famousBikes: [],
    favorites: [],
    allExperiences: [],
    timeZone: 'T00:00:00.000-03:00',
    bookingDates: {
        from: '',
        to: '',
        bikeIds: '',
        disabledDates: []
    }
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case CURRENT_PAGE:
            return {
                ...state,
                paginate: { ...state.paginate, currentPage: action.payload }
            }
        case SET_PARAMETERS:
            if (action.payload === 'resetAll') {
                action.payload = {
                    filters: { selected: [], labels: [], ids: [], type: '', traction: '', wheelSize: '', color: '', price: { min: '', max: '' } },
                    sorts: { selected: [], labels: [], ids: [], price: '', rating: '', name: '' }, search: { selected: [], search: '' }, date: { from: '', to: '' }
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
        case GET_ACCESORIES:
            return {
                ...state,
                accesories: action.payload
            }
        case GET_FAMOUS_BIKES: 
                const orderBikes = action.payload.sort((a, b) => {
                    if(a.rating > b.rating) return -1;
                    if(b.rating > a.rating) return 1;
                    return 0;
                });
                const principalBikes = orderBikes.slice(0, 12);
                return {
                    ...state,
                    famousBikes: principalBikes
                }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE: 
            return {
                ...state,
                favorites: state.favorites.filter(f => f.idBike !== action.idBike)
            }

        
        case POST_EXPERIENCE:
            return{
                ...state
            }
        
        case GET_ALL_EXPERIENCES:
            return{
                ...state,
                allExperiences: action.payload
            }

        case GET_ALL_BOOKINGS:
            return {
                ...state,
                allBookings: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case SET_BIKES_DETAIL:
            return {
                ...state,
                bikeDetail: action.payload
            }
        case GET_DISABLED_DATES:
            return {
                ...state,
                bookingDates: {...state.bookingDates, disabledDates: action.payload}
            }
        case SET_BOOKING_DATES:
            return {
                ...state,
                bookingDates: action.payload
            }
        default: return state
    }
}

export default rootReducer;

