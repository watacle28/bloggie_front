import {ADD_COMMENT, LOADING, GET_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT} from '../types'



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
        
        case EDIT_COMMENT:
            //find index of comment edited
            const index = state.post.comments.findIndex(comment => comment._id == payload._id)
            console.log({index});
            return {
                ...state, errors: null, loading: false, post: {comments: [...state.post.comments.map((comment, i) => i == index ? payload : comment )] }
            }
        case REMOVE_COMMENT:
            return {
                ...state, errors: null, loading: false, post: {comments: [...state.post.comments.filter(comment => comment._id != payload)]}
            }
        default:
            return state;
    }

} 