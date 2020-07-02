import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styled from 'styled-components';
import { createPost, getSinglePost, editPost } from '../redux/actions/posts';
import { CustomButton } from '../components/CustomButtom';
import { Tiny } from './Tiny';

const StyledEditor = styled.form`
 width: 100%;
 height: min-content;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 margin: 4rem auto;
 @media screen and (min-width: 700px){
  width: 100%;
   margin: auto;
 }
 label{
   color: white
 }
/* position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%); */

.hdr{
    text-transform: uppercase;
    color: white;
    font-weight: 900;
    margin-bottom: 3rem;

   }

input,textarea{ 
      border: 1px solid #e24727;
      background: transparent;
      margin-bottom: 1rem;
      border-radius: 200px;
      padding: 5px 12px;
      color: white;
      transition: all .5s ease-in-out;

      @media screen and (min-width: 576px){
          width:60%;
      };
      :focus{
          outline: none;
         
      }
        };
`
const StyledContainer = styled.div`
 height: 100%;
 width: 100vw;

 scroll-behavior: smooth;
 padding: 2rem 0;
`

export const Editor = (props) => {
  const postData = useSelector(state=> state.posts.currentPost)

   
    const dispatch = useDispatch();
    // const [image, setImage] = useState({preview: '', raw: ''})
    //  const [markdown,setMarkdown] = useState({html:'',text:''})
    const [data, setData] = useState({title : '', tags:''})
    const [tinyData, setTinyData] = useState('watacle')

    let loading = useSelector(state=> state.posts.loading)
   
    //  const handleMD = (e) => setMarkdown({...markdown,html: e.html, text: e.text})
    const handleEditorChange = (value) =>{
      setTinyData(value)
    }
    // const handleImage = (e) => {
     
    //      setImage({...image,
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0]
    //   })
    //   console.log({preview: image.preview});
       
    // }
    
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
        setTinyData('')
        // setImage({...image, preview: '', raw: ''})
       

      }

    const handlePublish = async (e) => {
        e.preventDefault()
    
      let formdata = {};
      formdata.tags = data.tags;
      formdata.title = data.title;
      formdata.body = tinyData
     
      if(id){
        dispatch(editPost(formdata,id,props.history))
          handleReset()
          return;
      } 
      
      dispatch(createPost(formdata,props.history))
      
       handleReset()
    loading = true;
      } 
      
      useEffect(() => {    
      
      dispatch(getSinglePost(id))
      
    }, [])

    useEffect(() => {
     handleReset()
      if(postData) {
     setData({...data, title:postData.title, tags: postData.tags})
    //  setImage({...image, preview: postData.blogImage})
     setTinyData(postData.body)
      }
     
    }, [postData])


    return (
       
       <StyledContainer>
        <StyledEditor autoComplete='off' onSubmit={handlePublish}>

          <h2 className='hdr'>Add a post</h2>
          <label htmlFor="title">TITLE</label>
          {!loading && <input type="text" autoFocus value={data.title} onChange = {handleDataChange} id="title" name="title"/>}
          <label htmlFor="tags">TAGS</label>
          <input type="text" value ={data.tags} id="tags"  onChange = {handleDataChange}  name="tags"/>
          {/* <ImageUpload image={image} handleChange={handleImage} /> */}
          <Tiny value={tinyData} handleEditorChange={handleEditorChange}/>
          <CustomButton disabled ={data.title === '' || data.tags === '' ||
            tinyData === '' ? true : false} 
          type='submit' >Publish</CustomButton>
          </StyledEditor>


          

       </StyledContainer>
     
    )
}
