import { GET_ALL_COURSES, ADD_COURSE, EDIT_COURSE, DELETE_COURSE } from "../types"

const initialState = {
    courses:[],
    loading:true
}

export const coursesReducer = (state=initialState , {type, payload}) =>{
    switch (type) {
        case GET_ALL_COURSES:
          return {
              ...state, courses:[...state.courses, payload], loading: false
          }
    
        case ADD_COURSE:
          return {
                ...state, courses: [...state.courses, payload], loading: false
          }

        case EDIT_COURSE:
            //get index of item to edit
            const index = state.courses.findIndex(course => course._id === payload._id)
            //assign new value to the item using the index
            state.courses[index] = payload
            return {
                ...state, courses: [...state.courses], loading: false
            }
            
        case DELETE_COURSE: 
            return {
                ...state, courses:[...state.courses.filter(course => course._id !== payload.id)]
            }
        default :
           return state
    }
}