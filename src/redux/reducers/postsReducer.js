import {GET_ALL_POSTS, GET_SINGLE_POST, POST_NOT_FOUND, PUBLISH_SUCCESS, ADD_COMMENT, LOADING, EDIT_SUCCESS, CLEAR_POST, REMOVE_POST, LIKE_POST, UNLIKE_POST} from '../types';

const initialState = {
    posts: [
      
    ],
    errors: null,
    currentPost: null,
    loading: true
}


export const postsReducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case LOADING:
            return {
                ...state, loading: true
            }
        case GET_ALL_POSTS:
            return{
                ...state,posts:payload,errors:null, loading: false
            }
         case GET_SINGLE_POST:
             
             return {
              ...state,errors: null,loading: false, currentPost: payload
             } 
         case POST_NOT_FOUND:
             return{
                 ...state, errors: payload, loading: false, currentPost: null
             }
         case PUBLISH_SUCCESS:
         case EDIT_SUCCESS :
             return {
                 ...state, errors: null, loading: false, posts: [...state.posts, payload]
             } 
        case REMOVE_POST:
            return {
                ...state, loading: false, errors: null, posts: [...state.posts.filter(post=> post._id !== payload)]
            }     
        case CLEAR_POST:
            return{
                ...state, currentPost: null, loading: false
            }
        case LIKE_POST:
            return{
                ...state, errors: null, loading: false, currentPost: {...state.currentPost, likes: [...state.currentPost.likes,payload]}
            }
        case UNLIKE_POST:
            return{
                ...state, errors: null, loading: false, currentPost: {...state.currentPost, likes: [...state.currentPost.likes.filter(like => like !== payload )]}

            }    
        default:
            return state;
    }
}