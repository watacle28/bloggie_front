import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 
import { FaEdit , FaCalendarAlt, FaThumbsUp, FaHeart, FaTrash}  from 'react-icons/fa'
import Avatar from 'react-avatar';
import me from './clo.jpg'
import { Link } from 'react-router-dom';


const StyledComment = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 1rem;
    .comment_data{
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 1rem;
        font-size: .7rem;
        .line{
            width: 80%;
            height: 1px;
            background-color: tomato;
            margin: 1rem auto auto auto;
        }
    }
    .comment_meta_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        svg{
            margin-right: 3px;
            color: white;
        }
        li{
            color:tomato;
        }
        
    }
`

export const Comment = ({comment:{body,likes,postedOn,owner}, clickToEdit, handleDeleteComment}) => {
    const currentUser = useSelector(state => state.auth.userData ? state.auth.userData._id : null);

    dayjs.extend(relativeTime)
    return (
        <StyledComment>
        <Link to={`/authors/${owner._id}`}> <Avatar  name={owner.username } textSizeRatio ={2} size={40} round={true}/></Link>
           
            <div className="comment_data">
                <ul className="comment_meta_info"> 
                <li><FaCalendarAlt/>{' '}{dayjs(postedOn).fromNow()}</li>
   {currentUser == owner._id ? <div>
    <Link to='#' onClick={clickToEdit}><FaEdit/> {' '} </Link>
    <Link to='#' onClick={handleDeleteComment}><FaTrash/></Link>
       </div> : ''}
   
    <li>{likes.length} {'  '} <FaHeart /></li>
                </ul>
                <div className="comment_body" dangerouslySetInnerHTML={{__html: body}}/>
                <div className="line"></div>
            </div>
        </StyledComment>
    )
}
