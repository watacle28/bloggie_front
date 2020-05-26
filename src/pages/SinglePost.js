import React ,{useEffect, useState, useRef} from 'react';
import prism from 'prismjs'
import Avatar from 'react-avatar';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import bg from '../components/bg.jpg';
import { getSinglePost, addComment, likePost, unlikePost, editComment, removeComment } from '../redux/actions/posts';
import { Md } from './md';
import { StyledAuthors } from './Authors';
import { Button } from 'react-bootstrap';
import { smartRedirect } from '../redux/actions/ui';
import { Comment } from '../components/comment';
import { FaHeart } from 'react-icons/fa';
import { LOADING } from '../redux/types';
import { NotFound } from './NotFound';

const StyledPost = styled.div`
    width: 80%;
    margin: 0 auto;
    min-height: 80vh;
    display: flex;
    align-items:center;
    color: white;
    flex-direction: column;
    margin-top: calc(2rem + 50px);
    background-color: #161e20;
    border-radius: 10px;
    overflow-x: hidden;
    a{
        color: white
    }
    .post_content{
        padding: 1rem;
        width: 100%;
        
        .comments{
            width: 100%;
            height: min-content;
        }
    }
    img{
        width: 100%;
        
     }
     h4{
         color: tomato;
         text-align: center;
         font-weight: 600;
     }
     .meta{
         display:flex;
         justify-content: space-between;
         opacity: .5;
         width: 100%;
         margin-bottom: 1rem;
     }
     .post-body{
         padding: 1rem;
         
     }
     
     pre{
         font-family: monospace !important;
         white-space: pre-wrap;
         font-size: .8rem;
         color: wheat;
         padding: 1rem !important;
         overflow: auto;
         
     }
     button{
         background-color: transparent;
         border-color: white;
         color: tomato;

     }
     .coa{
         text-align: center;
     }
     .commenting{
         display: flex;
         flex-direction: column;
         align-items: center;
         margin-bottom: 4rem;
         button{
             padding: 3px 8px;
         }
     }
    .icon{
        margin-left: 2px
    }
    .liked{
            color: tomato
        }
    .likes{
        display: flex;
        align-items: center
    }
`

const Loader = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
`
export const SinglePost = (props) => {
   const id = props.match.params.id
    const post = useSelector(state=> state.posts.currentPost)
    const postOne = useSelector(state=>state.comments)
    const isLoggedIn = useSelector(state => state.auth.authenticated)
     const currentUser = useSelector(state=> state.auth.userData ? state.auth.userData: null) 
    const loadingPosts = useSelector(state=> state.posts.loading)
    const [comment, setComment] = useState({text: 'add comment', html: ''})
    const [count, setCount] = useState(0)
    const handleComment = (e)=> setComment({...comment,html: e.html, text: e.text})
   const [isEditing, setIsEditing] = useState({status : false, id: null}) 
 /*check if user has already liked post  */
    let hasLiked = post && currentUser && post.likes.filter(like => like === currentUser._id);
    
     /* console.log({count, hasLiked})
   const handleLikePost = ()=>{
        hasLiked && setCount(1) 
        console.log({count,hasLiked})
        if(hasLiked && count == 0){
             dispatch(likePost(id, currentUser._id))
                setCount(1)
            }
      
        else if(hasLiked.length > 0 && count == 1) {
           
            dispatch(unlikePost(id,currentUser._id))
            setCount(0)
            }

   } */
  const handleLikePost = ()=>{
      if(count == 0){
        dispatch( likePost(id, currentUser._id))
        setCount(1)
        return;
      }
   return;
  }
  const handleUnLikePost = ()=>{
      
        dispatch(unlikePost(id, currentUser._id))
       setCount(0)
    
      
      
  }
    const sendComment = (e) => {
        e.preventDefault();
         console.log({comment})
        dispatch(addComment(comment.html,props.match.params.id))
        setComment({...comment, html: '',text: 'add comment'})
    }
    const handleStartEditComment = (comment) =>{
        setComment({...comment, text: comment.body})
        setIsEditing({...isEditing, status: true, id: comment._id})
      
    }
  
    const handleEditComment = (e) =>{
        e.preventDefault()
        dispatch(editComment(comment.html,isEditing.id))
        setComment({...comment, html: '',text: 'add comment'})
        setIsEditing({...isEditing, status: false, id: null})
    }

    const handleDeleteComment = (id) =>{
        dispatch(removeComment(id))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        
        dispatch(getSinglePost(id))
    
    }, [])
   const handleRedirect = ()=>{
        
       dispatch(smartRedirect(props.history.location.pathname))
   }
    return (
       <>
    ;
       {loadingPosts  ? <Loader className ='loading'>loading...</Loader> : post ?
        (<StyledPost>
       <img src={post.blogImage} alt="post image"/>
        <div className="post_content">
        <h4>{post.title}</h4>
        <div className="meta">
            <small>{post.tags}</small>
         <small>{new Date(post.createdAt).toLocaleDateString()}</small>
         <small>{post.likes.length}
         {hasLiked && hasLiked.length > 0 ? <Link  onClick={handleUnLikePost} ><FaHeart className = 'liked icon'/> </Link> :
         <Link  onClick={handleLikePost} ><FaHeart className = 'icon'/> </Link>}
         </small>
        </div>
        <div className="post_body">
            <div className='html' dangerouslySetInnerHTML={{__html:post.body}}/>
          
        </div>
        

        <div className="comments">
        <h4>Comments:</h4>
            {postOne.loading ? <Loader className ='loading'>loading...</Loader> : postOne.post.comments.map((comment)=>(
                <Comment comment={comment} hasLiked={hasLiked} handleDeleteComment={()=>handleDeleteComment(comment._id)} clickToEdit={()=> handleStartEditComment(comment)} key={comment._id}/>
            ))}
        </div>

         {  isLoggedIn ?  <div className="commenting">
         <Md name='comment' value={comment.text} onChange={handleComment}/>
                {isEditing.status ?  <button onClick={handleEditComment}>Save</button> :
                <button onClick={sendComment}>Add Comment</button>}
         </div>: 


        <div className='coa'>
        <Link to='/login'><Button onClick={handleRedirect}>Log In </Button></Link> / {' '}
         <Link to='/register'><Button onClick={handleRedirect}>Register </Button></Link> <br/>
           {' '} to comment
        </div>
         }
           
       
        </div>
    </StyledPost>) : <NotFound id={id} type={'Post'}/>}
       </>
    )
}
