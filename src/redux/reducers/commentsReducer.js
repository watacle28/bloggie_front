import {ADD_COMMENT, LOADING, GET_COMMENTS} from '../types'



const initialState = {
    post:{
        comments: [],
        user: null
    },
    loading: true,
    errors: null
}

export const commentsReducer = (state=initialState, {type,payload}) =>{
    switch (type) {
        case LOADING:
            return {
                ...state, loading: true
            }
        case GET_COMMENTS:
            return{
                ...state, loading: false, post:{...state.post, comments: payload}
            }    
        case ADD_COMMENT:
            return {
                ...state,errors: null, loading:false,post: {...state.post, comments: [...state.post.comments,payload.newComment]}
            }
        
    
        default:
            return state;
    }

} 