import { GET_ALL_POSTS,UNLIKE_POST, GET_SINGLE_POST, POST_NOT_FOUND, PUBLISH_SUCCESS ,ADD_COMMENT, LOADING, GET_COMMENTS, EDIT_SUCCESS, REMOVE_POST, LIKE_POST} from '../types';
import axios from 'axios';
import {toast} from 'react-toastify'

import { setAuthToken } from '../../utils/setAtuthToken';
import { loadUserData } from './auth';

axios.defaults.baseURL = 'http://localhost:5002/api'

export const getAllPosts = () =>async dispatch =>{
    try {
       const res = await axios.get('/public/blogs')
       const posts = res.data.blogs
     
       dispatch({
           type: GET_ALL_POSTS,
           payload: posts
       })
    } catch (error) {
       // dispatch({type: POST_NOT_FOUND})
    }
}


export const getSinglePost = (id) => async dispatch =>{
   try {
       dispatch({type: LOADING})
      const res = await axios.get(`public/blog/${id}`)
    
      dispatch({type: GET_SINGLE_POST, payload: res.data.blog})
      dispatch({type: GET_COMMENTS, payload: res.data.blog.comments})

   } catch (error) {
       dispatch({type: POST_NOT_FOUND, payload: error})
   }
}

export const createPost = (post,history) => async dispatch =>{
    try {
        
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post('/blog/create',post)
    
        dispatch({type: PUBLISH_SUCCESS, payload: res.data.newPost})
        history.push(`/post/${res.data.newPost._id}`)

    } catch (error) {
        console.log(error)
    }
}

export const editPost = (data,id,history)=> async dispatch =>{
    try {
        console.log({data})
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.put(`blog/edit/${id}`,data)
        //toast(res.data.msg, {type: 'success'})
        dispatch({type: LOADING})
       dispatch({type: EDIT_SUCCESS, payload: res.data })
       history.push(`/post/${id}`)

    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id,history)=> async dispatch=>{
    try {
        
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.delete(`blog/post/${id}`)
        toast(res.data.msg, {type: 'success'})
        dispatch({type: LOADING})
       dispatch({type: REMOVE_POST, payload: id})
       history.push(`/`)

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id,userId)=> async dispatch =>{
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        await axios.post(`blog/like/${id}`)
        dispatch({type: LIKE_POST, payload: userId})
    } catch (error) {
        console.log(error);
    }
}

export const unlikePost = (id,userId) => async dispatch =>{
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        await axios.delete(`blog/like/${id}`)
        dispatch({type: UNLIKE_POST, payload: userId})
    } catch (error) {
        console.log(error);
    }
} 

export const addComment = (comment,id)=> async dispatch=>{
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.post(`blog/comment/${id}`,{comment})
        toast(res.data.msg, {type: 'success'})
       // dispatch(loadUserData())
       dispatch({type: ADD_COMMENT, payload: res.data })
       
    
    } catch (error) {
        console.log(error)
    }
}

const editComment = (data,id)=> async dispatch =>{

}


const likeComment = (data,id)=> async dispatch =>{
    
}


const removeComment = (data,id)=> async dispatch =>{
    
}