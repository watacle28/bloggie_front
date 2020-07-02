import { GET_ALL_RESOURCES, EDIT_RESOURCE, ADD_RESOURCE, DELETE_RESOURCE } from "../types"

const initialState = {
    resources: [],
    loading: true
}


export const resourceReducer = (state=initialState,{type,payload})=>{
    switch (type) {
        case GET_ALL_RESOURCES:
            return {...state, resources: [...payload], loading: false}
        case EDIT_RESOURCE:
            const resourceIndex = state.resources.findIndex(src=> src._id == payload._id)
             state.resources[resourceIndex] = payload
          
            return {
                ...state, resources: [...state.resources], loading: false
            } 
        case ADD_RESOURCE:
            return{
                ...state, resources: [...state.resources,payload], loading: false
            }
        case DELETE_RESOURCE:
            return {
                ...state, resources: [...state.resources.filter(src=> src._id !== payload)],loading: false
            }    
        default:
           return state
    }
}