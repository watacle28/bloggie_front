import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import img from './bg.jpg';
import avatar from './clo.jpg';
import {} from 'react-icons';
import Ava from 'react-avatar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getSinglePost, deletePost } from '../redux/actions/posts';
const StyledCard = styled.div`
width: 100%;
overflow: hidden;
border-radius: 10px;
padding:-bottom 1rem;
font-size: 80%;
color: white;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
:last-child{
  margin-bottom: 1rem;
}
img{
width: 100%;
height: 50%;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
}

`
const CardFooter = styled.div`
display : flex;
justify-content: space-between;
align-items: center;
align-content: center;
p{display: flex; align-items: center}
`
const CardContent = styled.div`
padding:1rem;
.post_meta{
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .post_actions{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 30%;
    svg{
      color: tomato;
    }
  }
}
`
const Heading = styled.h6`
color: tomato;
text-transform: uppercase;
font-weight: bold;`


export const Card = (props)=>{
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector(state => state.auth.userData ? state.auth.userData._id : '')
  const postAuthor = props.post.author._id

  console.log(userId, postAuthor)
  dayjs.extend(relativeTime)
  
if(props.post.author === undefined) return "Unknown"
    return (
      
        <StyledCard>
      <img src={props.post.blogImage} alt=""/>
      <CardContent >
    <div className='post_meta'>
      {dayjs(props.post.createdAt).fromNow()}
     {userId === postAuthor ? <>
      <div className="post_actions">
       <Link to={`/edit/${props.post._id}`}><FaEdit/></Link>
        <Link to='#' onClick={()=>dispatch(deletePost(props.post._id,history))}><FaTrash/></Link>
          
      </div>
     </>: null}
      </div>
      <Heading>{props.post.title}</Heading>
        
        <CardFooter>
            <Ava src={avatar} size={30}  round={true}/>
            
            <p>{props.post.author.username}</p>
            <p>{props.post.comments.length} comments</p>
            <p>{props.post.likes.length} likes</p>

            
        </CardFooter>
      </CardContent>    
        </StyledCard>
      
    )
}
