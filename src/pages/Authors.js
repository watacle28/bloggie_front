import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components';
import pic from '../components/clo.jpg';
import { getAllBloggers } from '../redux/actions/user';
import { FaArrowCircleRight } from 'react-icons/fa';


const Container = styled.div`
text-transform: uppercase;
margin-top: 4rem;`


const StyledHeading = styled.h4`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    text-transform:uppercase;
    letter-spacing: 5px;
    color: white;
    font-weight: 900;
    ::before{
        content:'';
        color: white;
        background: black;
        position: absolute;
        width: 2rem;
        height: 3px;
        top: -1rem;

    }
    ::after{
        content:'';
        color: white;
        background: black;
        position: absolute;
        width: 4rem;
        height: 3px;
        top: 3rem;

    }
  

`

export const StyledAuthors = styled.div`

width: 100%;
overflow: hidden;
border: 1px solid rgba(255,255,255,.05);
border-radius: 10px;
margin:2rem auto;
padding: 1rem 2rem;
font-size: 80%;
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

a{
    color: #e24727;
    text-decoration:none;
    letter-spacing: 3px;
    transition: all .5s ease-in-out;
    :hover{
        letter-spacing:5px;
    }
}

img{ 
    /* box-shadow: 0 1px 4px 1px #e24727,0 2px 3px 1px #e24727,0 8px 10px -5px #e24727; */
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    object-fit:cover;
}
.posts{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
h5{
    margin-top: 1rem;
}
.num{
    background-color: #e24727;
    width:2rem;
    color: #000000;
    height: 2rem;
    display:grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 700;
}

`

export const Authors = ({match}) => {
    const authors = useSelector(state => state.bloggers.bloggers)
    const loadingBloggers = useSelector(state => state.bloggers.loading)
    const dispatch = useDispatch()
    console.log({authors});
    useEffect(() => {
        dispatch(getAllBloggers())
    }, [dispatch])

    return (
        <Container>
            
        <StyledHeading>Authors</StyledHeading>
       {!loadingBloggers && authors.map(author => ( 
            
           
               <StyledAuthors data-aos ='flip-right'>
         <Link to={`/author/${author._id}`}> <img src={pic} alt=""/></Link>
         <Link to={`/author/${author._id}`}> <h5>{author.username}</h5></Link>
         {author.role && <p>{author.role}</p>}
            {author.location && <p>Based in {author.location}</p>}
            <div className="posts">
                <div>Posts</div>
                
       <div className="num">{author.posts.length}</div>
       Joined on 28 June 2020
            </div> 
            </StyledAuthors>
      


       ))} 
        </Container>
    )
}
