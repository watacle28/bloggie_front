import React from 'react';
import styled from 'styled-components';
import pic from './bloggie_contact.jpg'
import { FaLocationArrow, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapPin, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    .profile{
        width: 100%;
        margin-bottom: 2rem;
        display: flex;
        padding: 1rem;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 20px;
        box-shadow: var(--box-shadow);
        justify-content: space-between;
        @media screen and (max-width: 700px){
            flex-direction: column;
        }
        .image{
            width: 100%;
            height: min-content;
            flex: 1;
            margin-right: 2rem;
            /* border: 5px solid rgba(255,255,255,.1); */
            border-radius: 50%;
            padding: .5rem;
            background: rgba(255,255,255,.1);
            img{
                width:100%;
                border-radius: 50%;
            }
        }
        .info{
            flex: 3;
            span{
                font-weight: 700;
                color: var(--primary-color)
            }
        }
        .loc{
            display: flex;
            align-items: center;
            width: 60%;
            box-shadow: var(--box-shadow);
            border-radius: 200px;
            padding: .2rem 1rem;
            margin-bottom: 1rem;
            svg{
                opacity: .2;
            }
        }
        .socio{
            width: 100%;
            display: flex;
            justify-content: space-between;
            a{
               opacity: .2;
            }
            
        }
    }  
    h4{
            border-left: 5px solid var(--primary-color);
            padding-left: 2px;
            margin-bottom: 2rem;
        }
    .contact-form{
        display: flex;
        flex-direction: column;
      
       label{
           display: flex;
           justify-content: space-between;
           width: 60%;
       }
        input,textarea{
            background: transparent;
            box-shadow: inset 2px 2px 10px rgba(255,255,255,.1), inset -2px -2px 10px rgba(255,255,255,.2);
            border-radius: 200px;
            padding : .2rem 1rem;
            
             color: white;
             border: none;
             &:focus{
                 outline: none;
             }
        }
        textarea{
            padding-top: .5rem;
            border-radius: 10px;
        }
    }
    button{
        width: max-content;
        align-self: flex-end;
    }
    `

export const Contact = () => {
    const Socio = [
        {icon: <FaFacebook/>, link: 'https://facebook.com/cwangayi'},
        {icon: <FaTwitter/>, link: 'https://twitter.com/watacle28'},
        {icon: <FaInstagram/>, link: 'https://instagram.com/cleopatros'},
        {icon: <FaLinkedin/>, link: 'https://linkedin.com/sirwatacle'}
    ]

    return (
        <StyledContainer>

           <div className="profile">
             <div className="image">
                 <img src={pic} alt="Cleo Wangayi"/>
             </div>
             <div className="info">
                 <p>Hi, My name is <span>Cleopas Tawanda Wangayi</span> and I am a self taught Javascript fullstack web developer</p>
                 <div className="loc">
                     <FaMapMarkerAlt/> <span>Cape Town, South Africa</span>
                 </div>
                 <ul className="socio">
                   {Socio.map((link,i)=>(
                       <li key={i}>
                           <a href={link.link} target='_blank'>{link.icon}</a>
                       </li>
                   ))}  
                 </ul>
             </div>
           </div>
           <h4>Send me a message</h4>
         
               <form autoComplete='off' className="contact-form">
                    <label htmlFor="name">Your name
                    <input type="text" id="name" name="name" placeholder='Name' /> </label>
                    <label htmlFor="email">Email Address
                    <input type="email" name="email" id="email" placeholder='email'/></label>
                    <textarea name="message" cols="30" rows="10" placeholder='Your message here'></textarea>
                    <CustomButton>Send Message</CustomButton>

               </form>
        
        </StyledContainer>
    )
}
