import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styled from 'styled-components';
import {ImageUpload} from '../components/ImageUpload';
import { Md } from './md';
import axios from 'axios';
import { createPost, getSinglePost, editPost } from '../redux/actions/posts';
import { CustomButton } from '../components/CustomButtom';

const StyledEditor = styled.form`
  width: 80vw;
 min-height: 100vh;
  overflow-y: scroll;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 margin: 4rem auto;
/* position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%); */

.hdr{
    text-transform: uppercase;
    color: white;
   }

input,textarea{ 
      background-color: #161a23;
      border: 1px solid black;
      margin-bottom: 1rem;
      border-radius: 10px;
      border: none;
      padding: 5px 12px;
     
      transition: all .5s ease-in-out;

      @media screen and (min-width: 576px){
          width:40%;
      };
      :focus{
          outline: none;
         
      }
        };
`
const StyledContainer = styled.div`
 min-height: 100vh;
 width: 100vw;
 overflow-y: scroll;
 scroll-behavior: smooth;
 padding: 2rem 0;
`

export const Editor = (props) => {
  const postData = useSelector(state=> state.posts.currentPost)

   
    const dispatch = useDispatch();
    const [image, setImage] = useState({preview: '', raw: ''})
    const [markdown,setMarkdown] = useState({html:'',text:''})
    const [data, setData] = useState({title : '', tags:''})

    let loading = useSelector(state=> state.posts.loading)
   
    const handleMD = (e) => setMarkdown({...markdown,html: e.html, text: e.text})
    const handleImage = (e) => {
         setImage({...image,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
       
    }
    
    const handleDataChange = (e)=>{
      setData({
          ...data,[e.target.name]: e.target.value
      })
  
    }
    //post id
      const id = props.match.params.id

      //func to reset fields after submit

      const handleReset = ()=>{
        setData({...data, title: '',tags:''})
        setMarkdown({...markdown, html:'',text: ''})
        setImage({...image, preview: '', raw: ''})
        //postData.body = ''

      }

    const handlePublish = async (e) => {
        e.preventDefault()
      
      const formdata = new FormData();
      formdata.append('blogImage',image.raw)
      formdata.append('body', markdown.html)
      formdata.append('title', data.title)
      formdata.append('tags', data.tags)
     
      if(id){
        dispatch(editPost(formdata,id,props.history))
        
          handleReset()
          return;
      } 
      
      dispatch(createPost(formdata,props.history))
      handleReset()
    
      } 
      
      useEffect(() => {    
      
      dispatch(getSinglePost(id))
      
    }, [])

    useEffect(() => {
     handleReset()
      if(postData) {
     setData({...data, title:postData.title, tags: postData.tags})
     setImage({...image, preview: postData.blogImage})
     setMarkdown({...markdown, html: postData.body})
      }
     
    }, [postData])


    return (
       
       <StyledContainer>
        <StyledEditor  onSubmit={handlePublish}>

          <h4 className='hdr'>Add a post</h4>
          <label htmlFor="title">Title</label>
          {!loading && <input type="text" autoFocus value={data.title} onChange = {handleDataChange} id="title" name="title"/>}
          <label htmlFor="tags">Tags</label>
          <input type="text" value ={data.tags} id="tags"  onChange = {handleDataChange}  name="tags"/>
          <label htmlFor="body">Post</label>
          <Md name = "markdown" value={postData ? postData.body : markdown.text}  onChange = {handleMD} />
          {/* <textarea name="body" id="body" cols="30" rows="auto"></textarea> */}
          <ImageUpload image={image} handleChange={handleImage} />
          <CustomButton disabled ={data.title === '' || data.tags === '' || markdown.html === '' ||
            image.preview === '' ? true : false} 
          type='submit' >Publish</CustomButton>
          </StyledEditor>


          

       </StyledContainer>
     
    )
}
