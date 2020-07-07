import React from 'react';
import styled from 'styled-components'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import {StyledResource} from './Resource'
import { Link } from 'react-router-dom';

export const TwitterAcc = ({acc,onEdit,onDelete}) => {
    return (
        <StyledResource>
            <div className='info'><h5><a href={`https://twitter.com/${acc.username}`} target='_blank' noreferer>{acc.username}</a></h5> 
            <div className='user-actions'><button onClick={onEdit}><FaEdit/></button> <button onClick={onDelete}> <FaTrashAlt/></button>
            </div>
            </div>
           <div className="meta">
           <div >shared by <span ><Link to={`/author/${acc.addedBy}`}>@{acc.addedBy}</Link></span></div>
           </div>
        </StyledResource>
    )
}
