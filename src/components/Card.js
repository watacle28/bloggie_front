import React, {useLayoutEffect,useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import img from './bg.jpg';
import avatar from './clo.jpg';
import {} from 'react-icons';
import Ava from 'react-avatar';
import { FaEdit, FaTrash, FaRegComments, FaRegHeart } from 'react-icons/fa';
import { getSinglePost, deletePost } from '../redux/actions/posts';
import { CustomButton } from './CustomButtom';

const StyledCard = styled(motion.div)`
width: 100%;
overflow: hidden;
border-radius: 10px;
border: 1px solid rgba(255,255,255,0.05);
font-size: 80%;
transition: all 1s ease-in-out;
color: white;
background: #000000;
margin: .5rem auto;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
:last-child{
  margin-bottom: 1rem;
}
a{
  color: white;
  text-decoration: none;
}
img{
width: 100%;

box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
}

`
const CardFooter = styled(motion.div)`
display : flex;
justify-content: space-between;
align-items: center;
align-content: center;
p{display: flex; align-items: center}
svg{
  margin-right: .5rem;
}
`
const CardContent = styled(motion.div)`
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
      color: #e24727;

    }
  }
}
`
const Heading = styled(motion.h6)`
color: #e24727;
text-transform: uppercase;
font-weight: bold;`

const parentVariants = {
  closed: { opacity: 0, x: "-100%" },
  open: { opacity: 1, x: 0 ,
    transition: {
      when: "beforeChildren",
    staggerChildren : 1
    }
 
}
}
const childrenVariants = {
  open: {opacity: 1,  x: 0 ,
      transition:{
        staggerChildren: 1
      }
  },
  closed: { opacity: 0, x: "-100%" }
}
const grandChildren = {
  open:{opacity: 1},
  closed: {opacity:0}
}

export const Card = (props)=>{
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector(state => state.auth.userData ? state.auth.userData._id : '')
  const postAuthor = props.post.author ? props.post.author._id : null
  dayjs.extend(relativeTime)
 if(props.post.author === undefined) {return "Unknown";}

    return (
      
        <StyledCard
        data-aos = "zoom-in"
     
         variants = {parentVariants}
         initial = 'closed'
         animate = 'open'
         
         >
     <Link to={`/post/${props.post._id}`}> <motion.img variants={childrenVariants} src={props.post.blogImage} alt=""/></Link>
      <CardContent  variants={childrenVariants}>
     
    <motion.div variants={grandChildren} className='post_meta'>
      {dayjs(props.post.createdAt).fromNow()}
     {userId === postAuthor ? <>
      <div className="post_actions">
       <Link to={`/edit/${props.post._id}`}><FaEdit/></Link>
        <Link to='#' onClick={()=>dispatch(deletePost(props.post._id,history))}><FaTrash/></Link>
          
      </div>
     </>: null}
      </motion.div>
      <Heading variants={grandChildren}><Link to={`/post/${props.post._id}`}>{props.post.title}</Link></Heading>
        
        <CardFooter variants={grandChildren}>
           <p> 
             <Ava name ={props.post.author && props.post.author.username}textSizeRatio={2} size={30}  round={true}/>
            <span>{props.post.author ? props.post.author.username : 'Unknown'}</span>
            </p>
            <p><FaRegComments/>{props.post.comments.length} </p>
            <p><FaRegHeart/>{props.post.likes.length} </p>

            
        </CardFooter>
      
      </CardContent>  
      <Link to={`/post/${props.post._id}`}><CustomButton variants={childrenVariants} secondary>Read more</CustomButton></Link>  
        </StyledCard>
      
    )
}
