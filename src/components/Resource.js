import React from 'react';
import styled from 'styled-components'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const StyledResource = styled.div`
    padding: .5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    border: 1px ridge rgba(100,100,100,.1);
    box-shadow: 1px 2px 4px rgba(255,255,255,.1);
    margin: .5rem auto;
    .info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    }
    h5{
        flex: 2;
        font-weight:400;
        margin:0;
    }
    .user-actions{
        
        flex: 1;
        display:flex;
        justify-content: flex-end;
        align-items: center;
        button{
            background: transparent;
            border: none;
        }
        svg{
            
            opacity: .1;
            transition: all .5s ease-out;
        &:hover{
            color: #e24727;
            opacity:1;
        } 
    }
    }
    .meta{
        color: rgba(255,255,255,.2);
        display: flex;
        justify-content: space-between;
       span{
           color: #e24727;
           opacity: .5;
       }
       .tag{
           padding: .1rem .5rem;
           border-radius: 200px;
           box-shadow: 1px 2px 5px rgba(255,255,255,.1);
         
           width: 5rem;
           text-align:center;
           
       }
    }
    `
export const Resource = ({resource,onDelete,onEdit}) => {
    return (
       <div>{resource &&
        <StyledResource>
          
              <div className="info">
              <h5><a href={resource.link} rel='noreferer' target='_blank'>{resource.name}</a></h5>
              <div className='user-actions'>
              <button onClick={() => onEdit()}><FaRegEdit/></button>
              <button onClick={onDelete}><FaRegTrashAlt/></button></div>
              </div>
             
              <div className="meta">
              <div>Shared by <span><Link to={`/author/${resource.addedBy}`}>@{resource.addedBy}</Link></span></div>
              <div className="tag">{resource.type}</div>
              </div>
        </StyledResource>
       }</div>
    )
}
