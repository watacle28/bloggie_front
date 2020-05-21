import React from 'react'
import {} from 'react-bootstrap'
import styled from 'styled-components';



const Jumbo = styled.div`

width: 100%;
height: 50vh;
color: white;
position: relative;
margin: 100px auto;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
z-index:2;
span{
    color: #000;
}
p{
    margin: auto;
}
a{color:#151d1f }
`
const Title = styled.h2`
width : 50%;
;
font-weight: bold;
text-transform: uppercase;
line-height: 3rem;
letter-spacing: 4px;
`

export const Hero = () => {
    return (
   <Jumbo>
   <Title>A Penny for your <span>thoughts?</span></Title>
   <p>A blog by <a href="https://www.twitter.com/@Cwangayi">C.Wangayi</a></p>
   </Jumbo>
    )
}
