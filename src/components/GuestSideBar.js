import React from 'react';
import styled from 'styled-components';
import { CustomButton } from './CustomButtom';
import { Link } from 'react-router-dom';
import 'prismjs/themes/prism-okaidia.css'
const StyledGuestSideBar = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     padding: 1rem;
     overflow-x: hidden;
    color: white;
        
        
    p{
        opacity: .5;
    }
`

export const GuestSideBar = () => {


    return (
        <StyledGuestSideBar>
           <h3>Altimate developer blogging space</h3>  
       
            <p>Got an account already ? </p>
            <CustomButton><Link to='/login'>Sign In</Link></CustomButton>
            <p></p>
            <p>New here and want to contribute?</p>
            <CustomButton><Link to='/register'>Register</Link></CustomButton>
            <p>Else feel free to browse through our articles</p>
            
       
        </StyledGuestSideBar>
    )
}
