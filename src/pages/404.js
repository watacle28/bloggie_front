import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const StyledDiv = styled.div`
    width: 80%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
    a{
        color: white
    }
    `

export const FourOFour = () => {
    return (
        <StyledDiv>
            <h1>404</h1>
            <p>Sorry it seems you reached the end of internet</p>
            <Link to='/'>Go back to safety</Link>
        </StyledDiv>
    )
}
