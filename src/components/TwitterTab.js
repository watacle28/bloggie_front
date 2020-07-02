import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components'
import { Modal } from './modal';
import { Form, StyledResourceForm } from './ResourceForm';
import { FaPlusCircle } from 'react-icons/fa';
import { CustomButton } from './CustomButtom';
import { getAllTwitAccs, deleteTwitAcc, addTwitAcc } from '../redux/actions/resources';
import { Loader } from '../pages/SinglePost';
import {TwitterAcc} from './TwitterAcc'


export const TwitterTab = ({clicks,setClicks,open,handleOpen}) => {
  
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const twitAccs = useSelector(state=> state.twitter)
  const handleChange = (e)=>{
    setUsername(e.target.value)
    }
  const save =(e)=>{
      e.preventDefault();
     dispatch(addTwitAcc(username))
     setUsername('');
     handleOpen(false)
  }
  const handleEdit =(e)=>{
      console.log(e)
  }
 useEffect(() => {
    if(clicks 
        && clicks.twitterTab === 0){
        dispatch(getAllTwitAccs())
        setClicks({...clicks,twitterTab : 1})
    }

 }, [])

    return (
        <StyledResourceForm>
            <h5>Who to follow on twitter</h5>
            <Modal open={open} setOpen={handleOpen}>
            <Form autoComplete='off' onSubmit={save}>
                <h5>Enter a Twitter handle</h5>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={username} onChange={handleChange} placeholder='@watacle28'/>
                <CustomButton type="submit">Save</CustomButton>
            </Form>
            </Modal>
            <button title='add twitter acc' id='add_btn' onClick={()=>handleOpen(true)}><FaPlusCircle/></button>
            <>
                {twitAccs.loading ? <Loader/> : twitAccs.twitterAccs.map(acc =>
                 <TwitterAcc key={acc._id} acc={acc} onEdit={handleEdit} onDelete={() => dispatch(deleteTwitAcc(acc._id))}/>)

              }
            </>
        </StyledResourceForm>
    )
}
