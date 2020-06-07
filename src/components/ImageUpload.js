import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { CustomButton } from './CustomButtom';

const Placeholder = styled.div`
width: 100%;
 
`

export const ImageUpload =({image,handleChange})=> {
 
  


  return (
    <div align="center">
      <label htmlFor="upload-button">
        {
          image.preview ? <img src={ image.preview } width="300" height="300" alt='preview'/> : (
            <>
             <CustomButton secondary>
                 Add Image
            </CustomButton>
            </>
          )
        }
      </label>
      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange}/>
      <br />

    </div>
  )
}
