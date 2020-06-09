import React,{useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import axios from 'axios';
import { ImageUpload } from '../components/ImageUpload';
import { CustomButton } from '../components/CustomButtom';
import { useEffect } from 'react';
import { Location } from '../components/Location';


    const ProfileContainer = styled(motion.div)`
        width: 100vw;
        min-height: 100vh;
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        h2 {
            color: white;
            font-weight: 900;
            text-transform: uppercase;
        }
        h3{
            
            font-weight: 700;
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
            appearance: none;
            color: white;
        }
        textarea{
            border-radius: 10px;
        }
        `
   
    
    export const EditProfile = () => {
        const [image,setImage] = useState({preview:'',raw:''})
        const [data,setData] = useState({first_name : '', surname:'', email:'', role:'',location:''})
        const [country, setCountry] = useState('')
        const [links,setLinks] = useState({fb:'', tw:'',insta:'',in:'',other:''})

        //handle changes to user info
        const handleChange = (e)=>{
           setData({...data, [e.target.name]: e.target.value})
        }
        //handle user selecting a profile image
        const handleUpload = (e) =>{
            
            setImage({
                ...image,
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            
        }
        //handle user selecting loaction NB will use an api to detect user location initially

        const handleLoc = (e) =>{
            setCountry(e.target.value)
            }
        //handle user's links
        const handleLinks = (e)=>{
            setLinks({...links, [e.target.name]: e.target.value})
        }
        //save user updated profile
        const handleSubmit = (e) =>{
            e.preventDefault();
            console.log({data,image,country,links});
        }
        useEffect
        (() => {
            setCountry('Zimbabwe')
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
                   
                    <Location value={country} handleLoc={handleLoc}/>
                    <CustomInput>
                    <label htmlFor="email">Bio</label>
                    <textarea placeholder='Say something about yourself...' rows='5' cols='20' id='bio' name='bio' onChange={handleChange}/>
                    </CustomInput> 
                    <h3>Contacts</h3>
                    <CustomInput>
                   <label htmlFor="fb">Facebook</label>
                    <input  type="text" id='fb' name='fb' onChange={handleLinks}/>
                   </CustomInput>
                   <CustomInput>
                   <label htmlFor="tw">Twitter</label>
                    <input  type="text" id='tw' name='tw' onChange={handleLinks}/>
                   </CustomInput>
                   <CustomInput>
                   <label htmlFor="insta">Instagram</label>
                    <input  type="text" id='insta' name='insta' onChange={handleLinks}/>
                   </CustomInput>
                   <CustomInput>
                   <label htmlFor="other">Other</label>
                    <input  type="text" id='other' name='other' onChange={handleLinks}/>
                   </CustomInput>
                   
                    <CustomButton type='submit'>Save Changes</CustomButton>
                   
                    </ProfileForm>
            </ProfileContainer>
        )
    }
    