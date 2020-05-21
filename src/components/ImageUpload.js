import React,{useEffect,useState} from 'react';
import styled from 'styled-components';

const Placeholder = styled.div`
width: 100%;
  div{
    border: 1px solid #ff4c3b;
    padding: 3px 7px;
    background-color: transparent;
    margin-bottom: 2rem;
  }
`

export const ImageUpload =({image,handleChange})=> {
 
  


  return (
    <div align="center">
      <label htmlFor="upload-button">
        {
          image.preview ? <img src={ image.preview } width="300" height="300" alt='preview'/> : (
            <>
             <Placeholder>
                 <div>Add Image</div>
            </Placeholder>
            </>
          )
        }
      </label>
      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange}/>
      <br />

    </div>
  )
}
