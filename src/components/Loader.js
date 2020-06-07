import React from 'react'
import styled from 'styled-components'
import {SpinnerInfinity} from 'spinners-react'
const Container = styled.div`
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
    justify-content:center;
`

export const Spinner = () =>{
    return (
    <Container>
     <SpinnerInfinity
            size = {100}
            thickness={100}
            color= 'tomato'
            speed={100}/>
    </Container> 
    )      
}
