import React ,{useEffect, useState, useRef} from 'react';
import 'prismjs/themes/prism-okaidia.css'

import Prism from 'prismjs'
import Avatar from 'react-avatar';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import bg from '../components/bg.jpg';
import { getSinglePost, addComment, likePost, unlikePost, editComment, removeComment, likeComment } from '../redux/actions/posts';
import { Md } from './md';
import { smartRedirect } from '../redux/actions/ui';
import { Comment } from '../components/comment';
import {Spinner} from '../components/Loader'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LOADING } from '../redux/types';
import { NotFound } from './NotFound';
import { toast } from 'react-toastify';
import { CustomButton } from '../components/CustomButtom';
import { Spacer } from '../components/Spacer';
import { Tiny } from './Tiny';
 //import {highlight,languages,highlightAll, highlightElement} from 'prismjs/components/prism-core'

const StyledPost = styled.div`
 
    width: 100%;
    margin: auto;
   height: min-content;
    display: flex;
    align-items:center;
    color: white;
    flex-direction: column;
    
    margin-top: calc(2rem + 50px);
    margin-bottom: 2rem;
    background-color: #010100;
    border: 1px 0 solid rgba(255,255,255,.5);
     overflow-x: hidden;
    padding: .5rem;
    @media screen and (min-width: 700px){
        margin-top: auto;
    }
    ul{
        margin-left: .5rem;
    }
    a{
        color: white
    }
    iframe{
        width:60%;
        display:block;
        margin: auto

    }
    table{
      
        width:60%;
        td,th{
         padding: 1rem;
         font-size: 1rem;
        }
    }
    .post_content{
        padding: .2rem;
        width: 100%;
        
        .comments{
            width: 100%;
            height: min-content;
        }
    }
    img{
        width: 100%;
        
     }
     h4,h5{
         color: #e24727;
         text-align: center;
         font-weight: 600;
         letter-spacing: 2px;
         
         text-transform: uppercase;
     }
     h5{
        font-weight: 400;
        color: white;
        margin: 1rem
     }
     .meta{
         display:flex;
         justify-content: space-between;
         opacity: .5;
         width: 100%;
         margin-bottom: 1rem;
         text-transform: uppercase;
     }
     .post-body{
         padding: 1rem;
         
     }
     
     .coa{
         text-align: center;
     }
     .commenting{
         display: flex;
         flex-direction: column;
         align-items: center;
       
        
     }
    .icon{
        margin-left: 2px
    }
    .liked{
            color: #e24727
        }
    .likes{
        display: flex;
        align-items: center
    }

`

export const Loader = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`
export const SinglePost = (props) => {
   
   const id = props.match.params.id
   const node = useRef()
    const post = useSelector(state=> state.posts.currentPost)
    const postOne = useSelector(state=>state.comments)
    const isLoggedIn = useSelector(state => state.auth.authenticated)
     const currentUser = useSelector(state=> state.auth.userData ? state.auth.userData: null) 
    const loadingPosts = useSelector(state=> state.posts.loading)
    const [comment, setComment] = useState({ html: ''})
    const [count, setCount] = useState(0)
    const handleComment = (value)=> setComment({...comment,html: value})
   const [isEditing, setIsEditing] = useState({status : false, id: null}) 
 /*check if user has already liked post  */
    let hasLikedPost = post && currentUser && post.likes.filter(like => like === currentUser._id);

  const handleLikePost = ()=>{
    if(!isLoggedIn) return toast('please log in or register first',{type: 'error'})

      if(count == 0){
        dispatch( likePost(id, currentUser._id))
        setCount(1)
        return;
      }
   return;
  }
  const handleUnLikePost = ()=>{
      if(!isLoggedIn) return toast('please log in or register first',{type: 'error'})
        dispatch(unlikePost(id, currentUser._id))
       setCount(0)
  
  }
    const sendComment = (e) => {
        e.preventDefault();
         console.log({comment})
        dispatch(addComment(comment.html,props.match.params.id))
        Prism.highlightAll()
        setComment({...comment, html: ''})
    }
    const handleStartEditComment = (comment) =>{
        setComment({...comment, html: comment.body})
        setIsEditing({...isEditing, status: true, id: comment._id})
       console.log(comment)
    }
  
    const handleEditComment = (e) =>{
        e.preventDefault()
        dispatch(editComment(comment.html,isEditing.id))
        setComment({...comment, html: ''})
        setIsEditing({...isEditing, status: false, id: null})
    }

    const handleDeleteComment = (id) =>{
        
        dispatch(removeComment(id))
        setComment({...comment, html: ''})
        setIsEditing({...isEditing, status: false, id: null})
    }
    const handleLikingComment = (id) =>{
        if(isLoggedIn){
            return  dispatch(likeComment(id,currentUser._id)) 
        }
        toast('please log in or register to like comment',{type: 'error'})
    }

    const dispatch = useDispatch()
    useEffect(() => {
      
       
        dispatch(getSinglePost(id))
    
    }, [])
    useEffect(() => {
       if(post && post.body){
        Prism.highlightAll()
       }
        
    }, [post && post.body,postOne.post.comments])
   const handleRedirect = ()=>{
        
       dispatch(smartRedirect(props.history.location.pathname))
   }
    return (
       <>
    
       {loadingPosts   ? <Spinner className ='loading'/> : post ?
        (<StyledPost>
     
        <div className="post_content">
        <h4>{post.title}</h4>
        <div className="meta">
     
    
            <small>{post.author.username}</small>
         <small>{new Date(post.createdAt).toLocaleDateString()}</small>
         <small>
         {hasLikedPost && hasLikedPost.length > 0 ? <Link  onClick={handleUnLikePost} ><FaHeart className = 'liked icon'/> </Link> :
         <Link  onClick={handleLikePost} ><FaRegHeart className = 'icon'/> </Link>}
        <span style={{marginLeft:'0.5rem'}}>{post.likes.length}</span>
         </small>
        </div>
        <div className="post_body">
        
            <div ref={node} className='html' dangerouslySetInnerHTML={{__html:post.body}}/>
          
        </div>
        

        <div className="comments">
        <h5>Comments:</h5>
            {postOne.loading ? <Loader className ='loading'>loading...</Loader> : postOne.post.comments.map((comment)=>(
                <Comment comment={comment} hasLikedPost={hasLikedPost} handleLikingComment={()=>handleLikingComment(comment._id)} clickToEdit={()=> handleStartEditComment(comment)} key={comment._id}
                handleDeleteComment = {()=>handleDeleteComment(comment._id)}/>
            ))}
        </div>

         {  isLoggedIn ?  <div className="commenting">
         {/* <Md name='comment' value={comment.text} onChange={handleComment}/> */}
         <Tiny value={comment.html} handleEditorChange={handleComment}/>
                {isEditing.status ?  <CustomButton secondary disabled={comment.text === '' ? true : false} onClick={handleEditComment}>Save</CustomButton> :
                <CustomButton secondary disabled={comment.html === '' ? true : false} onClick={sendComment}>Add Comment</CustomButton>}
         </div>: 


        <div className='coa'>
        <Link to='/login'><CustomButton secondary onClick={handleRedirect}>Log In </CustomButton></Link> <br/> or <br/> {' '}
         <Link to='/register'><CustomButton secondary onClick={handleRedirect}>Register </CustomButton></Link> <br/>
           {' '} to comment
        </div>
         }
           
       
        </div>
    </StyledPost>) : <NotFound id={id} type={'Post'}/>}
       </>
    )
}
