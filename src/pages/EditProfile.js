import React,{useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import axios from 'axios';
import { ImageUpload } from '../components/ImageUpload';
import { CustomButton } from '../components/CustomButtom';
import { useEffect } from 'react';

    const ProfileContainer = styled(motion.div)`
        width: 100vw;
        min-height: 100vh;
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        h2 {
            font-weight: 900;
            text-transform: uppercase;
        }

    `
    const ProfileForm = styled(motion.form)`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
         .profilePic {
             display:flex;
             justify-content: space-around;
             align-items: center;
             margin-bottom: 2rem;
         }
        button{
            border-color: #161a23
        }
        
    `
    const CustomInput = styled(motion.div)`
        display: flex;
        align-items: center;
        justify-content: space-between;
         margin-bottom: 1rem;
         
        label{
            padding-right: 1rem;
            text-transform: capitalize;
            color: white;
        }
        input,textarea{
            background: #161a23;
            border-radius: 200px;
            border: none;
            padding: .5rem 1rem;
           
            color: white;
        }
        textarea{
            border-radius: 10px;
        }
        `
   
    
    export const EditProfile = () => {
        const [image,setImage] = useState({preview:'',raw:''})
        const [data,setData] = useState({first_name : '', surname:'', email:'', role:'',location:''})


        const handleChange = (e)=>{
           setData({...data, [e.target.name]: e.target.value})
        }

        const handleUpload = (e) =>{
            console.log(e.target);
            setImage({
                ...image,
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            
        }

        const handleSubmit = (e) =>{
            e.preventDefault();
            console.log({data,image});
        }
        useEffect
        (() => {
    //    const getLoc = async ()=>{
    //         const location = await axios.get('https://ipapi.co/json/')
    //         console.log({location});
    //     }
    //     getLoc()
           
        }, [])
        return (
            <ProfileContainer>
                <h2>Update Profile </h2>
               
                <ProfileForm onSubmit={handleSubmit}>
                <div className="profilePic">
                    
                     <ImageUpload image={image} handleChange={handleUpload}/>
                </div>
                   
                   <CustomInput >
                   <label htmlFor="first_name">First Name</label>
                    <input 
                     type="text" id='first_name' name='first_name' onChange={handleChange}/>
                   </CustomInput>
                    <CustomInput>
                    <label htmlFor="surname">Surname</label>
                    <input  type="text" id='surname' name='surname' onChange={handleChange}/>
                    </CustomInput>
                   <CustomInput>
                   <label htmlFor="email">Email</label>
                    <input  type="email" id='email' name='email' onChange={handleChange}/>
                   </CustomInput>
                   <CustomInput>
                   <label htmlFor="role">Job Title</label>
                    <input  type="text" id='role' name='role' onChange={handleChange}/>
                   </CustomInput>
                    <CustomInput>
                    <label htmlFor="location">Location</label>
                    <input  type="type" id='location' name='location' onChange={handleChange}/>
                    </CustomInput>
                    <CustomInput>
                    <label htmlFor="email">Bio</label>
                    <textarea rows='5' cols='20' id='bio' name='bio' onChange={handleChange}/>
                    </CustomInput>
                    <CustomButton type='submit'>Save Changes</CustomButton>
                    </ProfileForm>
            </ProfileContainer>
        )
    }
    