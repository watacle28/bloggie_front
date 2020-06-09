import React ,{useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import showdown from 'showdown'
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
background-color: tomato;
margin: 1rem auto;
min-height: 30vh;
width: 100%;

.rc-md-editor{
    background-color: transparent !important;
    border: none;
}
.rc-md-navigation{
    background-color: transparent !important;
    border-bottom: none !important;
    padding: .5rem;
}
.rc-md-editor .editor-container .sec-md .input{
      background-color: #161a23;
    
}
.rc-md-editor .editor-container .sec-md .input{
    min-height: 10vh;
    margin-bottom: 1rem;
}
.rc-md-editor .editor-container{
    @media screen and (max-width: 576px){
      flex-direction: column !important;
      min-height: 20vh;
    }
}

`
 

export const Md = ({onChange,value}) => {
  const converter = new showdown.Converter()
  
    const render = (text)=> {
      //TODO use showdown instead of ReactMarkdown
        return React.createElement(ReactMarkdown, {
          source: text,
        })}

    // useEffect(() => {
      
    // }, [value])
   // console.log({value});
    return (
        <EditorContainer>
            <Editor 
          
            style={{height: '100%', width: '100%'}}
            renderHTML={render}
            value = {converter.makeMarkdown(value)}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: false,
                hideMenu: true,
              },
              table: {
                maxRow: 8,
                maxCol: 10
              }
            
            }}
            onChange={onChange} 
          />  
        </EditorContainer>
    )
}
