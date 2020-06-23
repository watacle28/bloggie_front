
import React, { useEffect, useState } from 'react'

import QuillEditor from '../components/Quill';
// import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import { CustomButton } from '../components/CustomButtom';

// const { Title } = Typography;

export const ReactQ=(props)=> {
const user = useSelector(state => state.user);

const [content, setContent] = useState("")
const [files, setFiles] = useState([])

const onEditorChange = (value) => {
    setContent(value)
    console.log(content)
}

const onFilesChange = (files) => {
    setFiles(files)
}

const onSubmit = (event) => {
    event.preventDefault();

    setContent("");

    if (user.userData && !user.userData.isAuth) {
        return alert('Please Log in first');
    }

    const variables = {
        content: content,
        userID: user.userData._id
    }

    axios.post('/api/blog/createPost', variables)
        .then(response => {
            // if (response) {
                
            console.log(response);
            //     setTimeout(() => {
            //         props.history.push('/blog')
            //     }, 2000);
            // }
        })
}


return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h2> Editor</h2>
        </div>
        <QuillEditor
            placeholder={"Start Posting Something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
        />

        <form onSubmit={onSubmit}>
            <div style={{ textAlign: 'center', margin: '2rem', }}>
                <CustomButton
                    size="large"
                    htmlType="submit"
                    className=""
                    onSubmit={onSubmit}
                >
                    Submit
            </CustomButton>
            </div>
        </form>
    </div>
)
}


