import React,{useEffect} from 'react'
import { FaFacebook,FaRegHeart, FaTwitter, FaInstagram, FaLinkedin,  FaPencilAlt,  FaRegComments } from 'react-icons/fa'
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import {StyledAuthors} from './Authors'
import pic from '../components/clo.jpg'

import { useSelector, useDispatch } from 'react-redux'
import { getSingleBlogger } from '../redux/actions/user'
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';
import { motion } from 'framer-motion';


const Container = styled(motion.div)`
    h5{
        text-transform: uppercase;
        color: #e24727;

    }
    p{ 
        text-transform: uppercase;
    }
    `
const Socio = styled.div`
margin: 1rem;
width: 100%;
display: flex;
align-items: center;
color: #e24727;
justify-content: space-around;`

const StyledPost =  styled.div`
    margin: .5rem;
    border: .1px solid rgba(255,255,255,.5) ;
    /* box-shadow: 2px 2px 31px 0px rgba(227,199,227,0.1); */
    width: 100%;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    a {
        color : #e24727
    }
    img{
        width:100%;
        border-radius: 0;
    }

`


const PostContent = styled.div`
    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
   align-items: stretch;
    justify-content: space-between;
     h6{
         text-transform: uppercase;
         color: #e24727
     }
    

`
const Date = styled(motion.p)`
        color: rgba(255,255,255,.5)
    `

const PostFooter = styled.div`
    width: 100%;
    display: flex;
    
    justify-content: space-between;
    
`



export const Author = (props) => {
    const currentBlogger = useSelector(state => state.bloggers && state.bloggers.currentBlogger)
    const loggedInBlogger = useSelector(state => state.auth && state.auth.userData && state.auth.userData._id)
    const dispatch = useDispatch()
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    dayjs.extend(relativeTime)
    useEffect(() => {
      dispatch(getSingleBlogger(props.match.params.id))
      
    }, [dispatch,props.match.params.id])
    return (
      <Container>
      {currentBlogger &&   <StyledAuthors>
      
              <img src={currentBlogger.avatar? currentBlogger.avatar : pic} alt=""/>
                <h5>{currentBlogger.fullname ? currentBlogger.fullname : currentBlogger.username}</h5>
                 {currentBlogger.role && <p>{currentBlogger.role}</p>}
                 {currentBlogger.location && <p>Based in {currentBlogger.location}</p>}
            <Socio className="socio-icons">
                <FaFacebook/>
                <FaTwitter/>
                <FaInstagram/>
                <FaLinkedin/>
            </Socio>
            <p style={{ textAlign: 'justify', marginTop:'1rem', textTransform:'capitalize'}}>{currentBlogger.bio && currentBlogger.bio}</p>

            {currentBlogger._id === loggedInBlogger ?
             <Link to ={`/profile/${loggedInBlogger}`}><CustomButton secondary ><FaPencilAlt/> {'  '}<span>Edit Profile</span></CustomButton></Link> : null}
            <div className="posts">
                <div>POSTS</div>
                
    <div className="num">{currentBlogger.posts.length}</div>
            </div>
            
           {currentBlogger.posts.map(post =>(
                <StyledPost>
               
                <PostContent>
                    <h6>{post.title}</h6>
                    <PostFooter>
                  
           <div><FaRegComments/><span>{'  '}</span>{post.comments.length}</div>
           <div> <FaRegHeart/> <span>{'  '}</span>{post.likes.length} </div>
                    </PostFooter>
                    <Date> 
                    {dayjs(post.createdAt).date() } 
                    <span>{' '}</span>
                    {month[dayjs(post.createdAt).month()]}
                    <span>{' '}</span>
                    {dayjs(post.createdAt).year()}
                    </Date>
                    <Link to={`/post/${post._id}`}>READ MORE...</Link>
                </PostContent>
            </StyledPost>
           ))}

        </StyledAuthors>}
      </Container>
    )
}
