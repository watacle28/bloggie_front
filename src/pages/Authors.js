import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import pic from '../components/clo.jpg';

const Container = styled.div`
margin-top: 8rem;`


const StyledHeading = styled.h4`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    text-transform:uppercase;
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
    width: 40%;
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
    padding: 6px 3px;
    border-radius: 50%;
    font-size: .8rem;
}

`
const authors = [1,2,32,2]
export const Authors = ({match}) => {
    
    return (
        <Container>
        <StyledHeading>Authors</StyledHeading>
       {authors.map((author,i)=>( 
            
           <Link to={`/authors/${i}`}>
               <StyledAuthors>
          <img src={pic} alt=""/>
            <h5>Sir watacle</h5>
            <small>Web developer</small>
            <div className="posts">
                <h6>Posts</h6>
                <h6>:</h6>
                <h6 className="num">178</h6>
            </div> 
            </StyledAuthors>
        </Link>


       ))}
        </Container>
    )
}
