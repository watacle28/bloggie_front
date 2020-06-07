import styled from 'styled-components';
import {motion} from 'framer-motion';

export const CustomButton = styled.button`
    padding: .25rem 1rem;
    background: ${props => props.secondary ? 'white' : 'transparent'};
    color: ${props => props.secondary ? '#161e20' : 'white'};
    border: 1px solid white;
    border-radius: 200px;
    text-transform: uppercase;
    font-weight: 700;
    margin: 1rem;
    outline: none;
    transition: all .5s ease-in-out;
    &:hover{
        border-color: #161e20;
        background: ${props => props.secondary ? 'tomato': 'transparent'};
        color: ${props => props.secondary ? 'white' : '#161e20'};
        scale: 1.1;    
        };
    &:disabled{
    opacity: 0.2;
    pointer-events: none;
    }
     & :focus{
          outline: none;
  }
   
    `
