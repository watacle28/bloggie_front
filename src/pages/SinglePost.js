import React ,{useEffect, useState} from 'react';
import prism from 'prismjs'
import Avatar from 'react-avatar';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import bg from '../components/bg.jpg';
import { getSinglePost, addComment, likePost, unlikePost } from '../redux/actions/posts';
import { Md } from './md';
import { StyledAuthors } from './Authors';
import { Button } from 'react-bootstrap';
import { smartRedirect } from '../redux/actions/ui';
import { Comment } from '../components/comment';
import { loadUserData } from '../redux/actions/auth';
import { FaThumbsUp, FaHeartbeat, FaHeart } from 'react-icons/fa';

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
         justify-content: space-around;
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
    const [comment, setComment] = useState({text: '', html: ''})
 
    const handleComment = (e)=> setComment({...comment,html: e.html, text: e.text})

   const handleLikePost = ()=>{
          /*check if user has already liked post  */
        const hasLiked = post && currentUser && post.likes.filter((like=> like === currentUser._id));
        console.log({hasLiked})
        if(hasLiked.length < 1){ return dispatch(likePost(id, currentUser._id))}
       else {return dispatch(unlikePost(id,currentUser._id))}
   }
  
    
    const sendComment = (e) => {
        e.preventDefault();
         console.log({comment})
        dispatch(addComment(comment.html,props.match.params.id))
        setComment({...comment, html: '',text: ''})
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
       {loadingPosts ? <Loader className ='loading'>loading...</Loader> : post &&
        (<StyledPost>
       <img src={post.blogImage} alt="post image"/>
        <div className="post_content">
        <h4>{post.title}</h4>
        <div className="meta">
            <small>{post.tags}</small>
         <small>{new Date(post.createdAt).toLocaleDateString()}</small>
         <small><Link to='#' onClick={handleLikePost}>{post.likes.length}<FaHeart/></Link></small>
        </div>
        <div className="post_body">
            <div className='html' dangerouslySetInnerHTML={{__html:post.body}}/>
          
        </div>

        <div className="comments">
        <h4>Comments:</h4>
            {postOne.loading ? <Loader className ='loading'>loading...</Loader> : postOne.post.comments.map((comment)=>(
                <Comment comment={comment} key={comment._id}/>
            ))}
        </div>

         {  isLoggedIn ?  <div className="commenting">
         <Md name='comment' value={comment.text} onChange={handleComment}/>
         <button onClick={sendComment}>Add Comment</button>
         </div>: 


        <div className='coa'>
        <Link to='/login'><Button onClick={handleRedirect}>Log In </Button></Link> / {' '}
         <Link to='/register'><Button onClick={handleRedirect}>Register </Button></Link> <br/>
           {' '} to comment
        </div>
         }
           
       
        </div>
    </StyledPost>)}
       </>
    )
}