import {RESERVATION_REMOVE,RESERVE_SUCCESS,RESERVE_FAIL, USER_LOADED, CLEAR_USER} from "../actions/types";

const initialState = {
    user : {},
    reservations : [],
    fines: null,
    currentLoans: [],
    errors: {}


}

export const memberReducer = (state = initialState, {type,payload})=>{
    switch (type) {
        case USER_LOADED: 
            return {
                ...state, user: payload
            }
        // case RESERVE_SUCCESS: 
        //     return{
        //         ...state, reservations: [...state.reservations,payload]
        //     }
        case RESERVE_FAIL:
            return{
            ...state,errors: payload
            }
        case CLEAR_USER:
            return {
        ...state, user: {},reservations: [], fines: null, currentLoans: [],errors: {}
            }
        default:
            return state
    }
}