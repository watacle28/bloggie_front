import React,{useEffect} from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styled from 'styled-components'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import {StyledAuthors} from './Authors'
import pic from '../components/clo.jpg'
import bg from '../components/bg.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { getSinglePost } from '../redux/actions/posts'
import { getSingleBlogger } from '../redux/actions/user'
import { Link } from 'react-router-dom';

const StyledPost =  styled.div`
    margin: .5rem;
    background-color: #161e20;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    a {
        color : tomato
    }
    img{
        width:100%;
        border-radius: 0;
    }

`
const PostContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
     
    h6{
        color: tomato;
        text-transform: uppercase;
    }

`
const Socio = styled.div`
margin: 1rem;
width: 100%;
display: flex;
align-items: center;
color: #161e20;
justify-content: space-around;`


const PostFooter = styled.ul`
    width: 100%;
    display: flex;
    
    justify-content: space-between;
`
export const Author = (props) => {
    const currentBlogger = useSelector(state => state.bloggers && state.bloggers.currentBlogger)
    const dispatch = useDispatch()
    dayjs.extend(relativeTime)
    useEffect(() => {
      dispatch(getSingleBlogger(props.match.params.id))
      
    }, [])
    return (
      <>
      {currentBlogger &&   <StyledAuthors>
              <img src={pic} alt=""/>
                <h5>{currentBlogger.username}</h5>
            <small>Web developer</small>
            <Socio className="socio-icons">
                <FaFacebook/>
                <FaTwitter/>
                <FaInstagram/>
                <FaLinkedin/>
            </Socio>
            <div className="posts">
                <h6>Posts</h6>
                <h6>:</h6>
    <h6 className="num">{currentBlogger.posts.length}</h6>
            </div>
            <h3>Blog Posts</h3>
           {currentBlogger.posts.map(post =>(
                <StyledPost>
                <img src={post.blogImage} alt=""/>
                <PostContent>
                    <h6>{post.title}</h6>
                    <PostFooter>
                    <li> <p>{dayjs(post.createdAt).fromNow()}</p></li>
                    <li><p>{post.comments.length} comments</p></li>
                    <li><p>{post.likes.length} likes</p></li>
                    </PostFooter>
                    <Link to={`/post/${post._id}`}>Read more...</Link>
                </PostContent>
            </StyledPost>
           ))}

        </StyledAuthors>}
      </>
    )
}
