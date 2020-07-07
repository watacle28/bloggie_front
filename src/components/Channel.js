import React from 'react';
import styled from 'styled-components'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StyledResource } from './Resource';


export const Channel = ({channel,onDelete,onEdit}) => {
    return (
       <div>{channel &&
        <StyledResource>
          
              <div className="info">
              <h5><a href={channel.link} rel='noreferer' target='_blank'>{channel.name}</a></h5>
              <div className='user-actions'>
              <button onClick={onEdit}><FaRegEdit/></button>
              <button onClick={onDelete}><FaRegTrashAlt/></button></div>
              </div>
             
              <div className="meta">
              <div>Shared by <span><Link to={`/author/${channel.addedBy}`}>@{channel.addedBy}</Link></span></div>
              <div className="tag">{channel.platform}</div>
              </div>
        </StyledResource>
       }</div>
    )
}
