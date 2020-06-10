import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components';
import pic from '../components/clo.jpg';
import { getAllBloggers } from '../redux/actions/user';
import { FaArrowCircleRight } from 'react-icons/fa';


const Container = styled.div`
margin-top: 8rem;`


const StyledHeading = styled.h4`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    text-transform:uppercase;
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

width: 80%;
overflow: hidden;
border-radius: 10px;
margin:2rem auto;
padding: 1rem;
font-size: 80%;
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);

:last-child{
  margin-bottom: 3rem;
};

img{ 
    box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
}
.posts{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
}
h5{
    margin-top: 1rem;
}
.num{
    background-color: #222;
    width:30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    border-radius: 50%;
    font-size: .8rem;
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
            
           <Link to={`/authors/${author._id}`}>
               <StyledAuthors data-aos ='flip-right'>
          <img src={pic} alt=""/>
            <h5>{author.username}</h5>
            <small>Web developer</small>
            <div className="posts">
                <h6>Posts</h6>
                <h6><FaArrowCircleRight/></h6>
       <h6 className="num">{author.posts.length}</h6>
            </div> 
            </StyledAuthors>
        </Link>


       ))} 
        </Container>
    )
}
