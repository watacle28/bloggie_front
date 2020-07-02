import React from 'react';
import {useDispatch} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components';
import Avatar from 'react-avatar'
import pic from './clo.jpg'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomButton } from './CustomButtom';
import { logout } from '../redux/actions/auth';



const StyledSideBar = styled(motion.section)`
   
     width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     padding: 1rem;
    
`
const UserInfo = styled(motion.div)`
   width: 100%;
   display: flex;
    justify-content: center;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    border-left: 3px solid #e24727;
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
                padding: .2rem .6rem;
                font-weight:bold;
                margin-left: 1rem;
            }
        }
    }
    `

export const AuthSideBar = ({user}) => {
const dispatch = useDispatch()
    const links = [
        {icon: <FaFacebook/>, to: '/authors'},
        {icon: <FaTwitter/>, to: 'www.facebook.com'},
        {icon: <FaLinkedin/>, to: 'www.facebook.com'},
        {icon: <FaInstagram/>, to: 'www.facebook.com'},

    ]
    return (
        <StyledSideBar>
          <UserInfo>
            <Avatar className='avatar' size='100' round src={user && user.avatar}/>
            <div className='links'>
            <h6>{user && user.fullname}</h6>
            <p>{user && user.role}</p>
                <ul>
    {links.map((link,i)=> (<Link to={link.to}>{link.icon}</Link>))}
                </ul>
            <div>Posts  <span>{user && user.posts.length}</span></div>
            </div>
          </UserInfo>  
         
        <CustomButton><Link to='/editor'>Add new Post</Link></CustomButton>
        <div>
           <Link onClick={()=>dispatch(logout())}> <FaSignOutAlt/>Sign Out</Link>
        </div>
        </StyledSideBar>
    )
}
