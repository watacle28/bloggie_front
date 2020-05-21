import React from 'react';
import styled from 'styled-components';

const StyledFoot = styled.div`
width: 100%;
height: auto;
position: fixed;
bottom: 0;
left:0;
z-index: 100;
display: flex;
color: white;
flex-direction: column;
align-items: center;
font-size: x-small;
`

const Copyright = styled.div`
display: flex;
margin-bottom: -1rem;
 p{color:white;
 span{
     color: white
 }}
`
const Contact = styled.ul`
list-style: none;
color: rgba(255,255,255,.6);
display: flex;
justify-content: space-between;
a{
    color: skyblue;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    :hover{
        border-bottom: tomato !important;
    }
};
li{margin: .5rem}
`
const contactLinks = [
    {name: 'Facebook',
    link: 'https://www.facebook.com/cwangayi'},
    {name: 'Twitter',
    link: 'https://www.twitter.com/Cwangayi'},
    {name: 'LinkedIn',
    link: 'https://www.linkedin.com/cwangayi'},
    {name: 'Instagram',
    link: 'https://www.instagram.com/cwangayi'},
    
]

export const Footer = () => {
    return (
        <StyledFoot>
        <Copyright>
            <p>Bloggie <span> © {new Date().getFullYear()} 
                </span></p>
         </Copyright>
            <Contact>
    {contactLinks.map((contact,i)=><li key={i}><a href={contact.link}>{contact.name}</a></li>)}
            </Contact>    
       
        </StyledFoot>
    )
}
