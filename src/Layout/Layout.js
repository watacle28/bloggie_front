import React from 'react';
import {Container} from 'react-bootstrap';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {Footer} from './Footer'
import styled from 'styled-components';
import { Headr } from './Headr/Headr';

const StyledLayout= styled.div`
min-height: 100vh;
position: relative;
`

export const Layout = ({children}) => {
    return (
        <StyledLayout>
        <Headr/>
        <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
         {children}
         <Footer />  
            
        </StyledLayout>
    )
}
