import React,{useState,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Avatar from 'react-avatar'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useOnClickOutside} from './handleOutsideClick'
import {Burger} from './Burger'
import {logout} from '../../redux/actions/auth'  
import Logo from './Bloggie.svg'
import { CLEAR_POST } from '../../redux/types';
  
const publicLinks = [
    {to:'/', label: 'Home'},
    {to:'/blogs' ,label: 'Blogs'},
    {to:'/authors', label: 'Authors'},
    {to:'/contact', label: 'Contact'},
    {to: '/login' , label: 'Login'},
    {to: '/register', label: 'Register'},
   
]
 const authLinks = [
 
  {to:'/', label: 'Home'},
  {to:'/authors', label: 'Authors'},
  {to:'/blogs' ,label: 'Blogs'},
  
  {to:'/contact', label: 'Contact'},
  {to: '/editor', label: 'Add Post'},
  {to: '#', label: 'LogOut'},
 ]

const StyledHeadr = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: center;
  background: #222222;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 110;
  width: 100%;
  transform: ${({open})=> open ? 'translateX(0)' : 'translateX(-100%)'}  ;
 a.active button{
   color: tomato;
 }
 @media screen and (min-width: 577px){
      flex-direction: row;
      justify-content: space-between;
      height: 10vh;
      transform: translateX(0)

  }
button{
  background: transparent;
  border: none;
  :focus{
    outline: none;
  }

}

  a , button{
    font-size: 1rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    
    text-decoration: none;
    transition: color 0.3s linear;
      
      text-align: center;
    &:hover{
      color: tomato;
    }
    &.active{
      color:tomato;
      
    }
    @media screen and (min-width: 577px) {
        font-size: 1rem;
      letter-spacing: 2px;
    }
  }

`
const MobileHead = styled.div` 
   display:flex;
   position: fixed;
   align-items: center;
   z-index:9999;
   width: 80%;
   margin: auto 2rem;
   justify-content: space-between;
   top: 5%;
   height: 40px;
   img{
     width: 40px;
     border-radius: 50%
   }
 
`

export const Headr = ({history}) => {
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const [open , setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node,()=>setOpen(false))
    const handleClick =(link) =>{
      if(link.label === 'LogOut'){
        dispatch(logout())
      }
      if(link.label === 'Add Post'){
        dispatch({type: CLEAR_POST})
      }
      else{
        return
      }
    }
    return (
        <div >
       <MobileHead>
       <Burger open={open} setOpen={setOpen}/>
{!auth.loading && auth.authenticated && auth.userData && <Avatar name={auth.userData.username } textSizeRatio={2} size={40}  round={true}/>}

       <img src={Logo} alt="logo"/>
       </MobileHead>
        <StyledHeadr ref ={node} open = {open}>
    {auth.authenticated ? authLinks.map((link,index)=><NavLink  key={index} to={link.to}>
                  <button
                   onClick={()=>handleClick(link)}>
                    {link.label}</button></NavLink>):
                  publicLinks.map((link,index)=><NavLink key={index} to={link.to}><button>{link.label}</button></NavLink>)}
        </StyledHeadr>
        </div>
    )
}
