// import React,{useState,useRef} from 'react';
// import styled, { withTheme } from 'styled-components';
// import {motion} from 'framer-motion';
// import {Editor,Viewer} from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import Code from 'codemirror/lib/codemirror'
// import 'codemirror/lib/codemirror.css';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
// import css from 'highlight.js/lib/languages/css';
// import html from 'highlight.js/lib/languages/htmlbars';
// import 'highlight.js/styles/night-owl.css';
// import 'codemirror/theme/dracula.css'
// import {Controlled as Code} from 'react-codemirror2';
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('css', css);
// hljs.registerLanguage('html', html);



 

// const Container = styled.div``


// export const NewEditor = () => {
//     const [value,setvalue] = useState('hello')
//     const node = useRef()
//     console.log({node,value})
   
//     return (
//         <Container style={{marginTop:'3rem'}}>
            
//             <Editor 
//              initialContent = {value}
//             //  previewStyle="horizontal"
//             height="50vh"
//              initialEditType="markdown"
//              useCommandShortcut={true}
//             plugins={[[codeSyntaxHighlight,{hljs}]]}
//              ref={node}>
            

//              </Editor>
//             {/* <Viewer
//              height= "50vh"
//              initialValue= ''
//             /> */}
//         </Container>
//     )
// }
