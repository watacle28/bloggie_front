import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styled from 'styled-components'
import {StyledAuthors} from './Authors'
import pic from '../components/clo.jpg'
import bg from '../components/bg.jpg'

const StyledPost =  styled.div`
    margin: .5rem;
    background-color: #161e20;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
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
export const Author = () => {
    const authorPosts = [1,2,1,2,3,1,2]
    return (
        <StyledAuthors>
              <img src={pic} alt=""/>
            <h5>Sir watacle</h5>
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
                <h6 className="num">178</h6>
            </div>
            <h3>Blog Posts</h3>
           {authorPosts.map(post =>(
                <StyledPost>
                <img src={bg} alt=""/>
                <PostContent>
                    <h6>My First Post</h6>
                    <PostFooter>
                    <li> <small>27/00/99</small></li>
                    <li><small>2 comments</small></li>
                    <li><small>3 likes</small></li>
                    </PostFooter>
                </PostContent>
            </StyledPost>
           ))}

        </StyledAuthors>
    )
}
