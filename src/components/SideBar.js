import React from 'react';
import {motion} from 'framer-motion'
import styled from 'styled-components';
import Avatar from 'react-avatar'
import pic from './clo.jpg'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomButton } from './CustomButtom';

const StyledSideBar = styled(motion.section)`
     width : 100%;
     border: 1px solid rgba(255,255,255,0.1);
     border-right:none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
     padding: 1rem;
     min-width: 330px;
`
const UserInfo = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 200px;
    .avatar{
       flex:1;
    }
    .links{
        flex: 2;
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
        h6{
            color: #e24727;
        }
        a{
            text-decoration: none;
            color: white;
            margin: auto 1rem;
        }
        div{
            color: #e24727;
            span{
                color : white;
                background: #e24727;
                mix-blend-mode: screen;
                border-radius: 200px;
                padding: .5rem 2rem;
                font-weight:bold;
                margin-left: 2rem;
            }
        }
    }
    `

export const SideBar = () => {
    const links = [
        {icon: <FaFacebook/>, to: '/authors'},
        {icon: <FaTwitter/>, to: 'www.facebook.com'},
        {icon: <FaLinkedin/>, to: 'www.facebook.com'},
        {icon: <FaInstagram/>, to: 'www.facebook.com'},

    ]
    return (
        <StyledSideBar>
          <UserInfo>
            <Avatar className='avatar' size='100' round src={pic}/>
            <div className='links'>
                <h6>Cleopas T Wangayi</h6>
                <ul>
    {links.map((link,i)=> (<Link to={link.to}>{link.icon}</Link>))}
                </ul>
            <div>Posts  <span>6</span></div>
            </div>
          </UserInfo>  
        <CustomButton>Create a new Post</CustomButton>
        <div>
            <FaSignOutAlt/>Sign Out
        </div>
        </StyledSideBar>
    )
}
