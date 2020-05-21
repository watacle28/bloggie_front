import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components';
import { login } from '../redux/actions/auth';
import { Link } from 'react-router-dom';

export const StyledForm = styled.form`
  width: 80vw;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

 
  h2{
      color: white;
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-weight: 400;
  }
  label,button{
      display: block;
      margin: 0;
      font-size: .8rem;
      opacity: .6;
      
  }
  input{ 
      background-color: transparent;
      border: none;
      margin-bottom: 1rem;
      border-bottom: 1px solid black;
      transition: all .5s ease-in-out;
      @media screen and (min-width: 576px){
          width:40%;
      };
      :focus{
          outline: none;
          transform: scale(1.1);
      }
  }
  button{
      background: transparent;
      text-transform: uppercase;
      margin: 1rem 0;
      padding: 3px 6px;
      border: none;
      font-weight: 400;
      border: 1px solid black;
      transition: all .5s ease-in-out;
      @media screen and (min-width: 576px){
          width:20%;
      };
      :focus{
          outline: none;
          
      };
      :hover{
          color: white;
          border-color: white;
          transform: scale(1.1);
      }

    }
  a{
      color: white
  }
  
`

export const Login = (props) => {
    
    const [loginData, setLoginData] = useState({email:'', password:''})
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.errors)
    const prevPage = useSelector(state=>state.ui.url)

      const handleChange = (e)=>{
            setLoginData({
                ...loginData,[e.target.name]: e.target.value
            })
      }

     const handleSubmit =  (e)=>{
         e.preventDefault();
         const url = prevPage ? prevPage : '/'
        dispatch(login(loginData,props.history, url))
        console.log(errors);
     }
  
    return (
    
            <StyledForm onSubmit={handleSubmit} noValidate >
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' onChange={handleChange}/>
                <button type='submit'>Log In</button>
    <small>New here?<Link to='/register'>Create an account</Link></small>
            </StyledForm>
    
    )
}
