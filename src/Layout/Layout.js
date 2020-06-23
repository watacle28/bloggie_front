import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {Footer} from './Footer'
import styled from 'styled-components';
import { Headr } from './Headr/Headr';
import { SideBar } from '../components/SideBar';


const StyledLayout= styled.div`
width: 100vw;
min-height: 100vh;
position: relative;

.min880{
    position: relative;
  display: flex;
 justify-content: center;
 margin: auto;
 margin-top: 10vh;
 margin-bottom: 5vh;

  .profile{
    display: none;
    @media screen and (min-width: 700px) {
            display:flex;
            
            flex: 1;
            max-width: 500px;
            height: min-content;
           
        }
    }
    .children{
        /* padding: 2rem 0 4rem 0; */
       
        position: relative;
        width: 100%;
        border: 1px solid rgba(255,255,255,0.1);
        @media screen and (min-width: 700px) {
            max-width: 700px;
            
             flex: 2;
             display: flex;
             justify-content: center;
            
        }
    }
}
`

export const Layout = (props) => {
   
    return (
        <StyledLayout>
        <Headr />
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
        <div className="min880">
        <div className="profile"> 
          <SideBar/>
        </div>
        <div className="children">{props.children}</div>
        </div>
         <Footer />  
            
        </StyledLayout>
    )
}
