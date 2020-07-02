import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal } from './modal';
import { Form, StyledResourceForm } from './ResourceForm';
import { FaPlusCircle } from 'react-icons/fa';
import { CustomButton } from './CustomButtom';

export const ChannelsTab = ({clicks,setClicks,open,handleOpen}) => {
    const channels = ['Youtube', 'Twitch']
    const [channel, setChannel] = useState({name:'',link:'',platform:'none'});

  const handleChange = (e)=>{
      setChannel({...channel,[e.target.name]: e.target.value})
  }
     
  const save =(e)=>{
      e.preventDefault();
     console.log(channel)
  }
    return (
        <StyledResourceForm>
            <h5>Channels to watch</h5>
            <button title='add a channel' id='add_btn' onClick={()=>handleOpen(true)}><FaPlusCircle/></button>
            <Modal open={open} setOpen={handleOpen}>
            <Form autoComplete='off' onSubmit={save}>
                <h5>Enter Channel details</h5>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={channel.name} onChange={handleChange} placeholder='WebDevSimplified'/>
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" value={channel.link} onChange={handleChange} placeholder='https://www.youtube.com/watch?v=SC5ROke_WMc'/>
                Select a platform for the channel
                {channels.map((chl,i) =><div className='radioLabel' key={i}>
                
                <input type="radio" name="platform" value={chl} id={chl} checked ={channel.platform === chl} onChange={handleChange} />
                <label htmlFor={chl}>{chl}</label>
                
                </div>)}
                <CustomButton type="submit">Save</CustomButton>
            </Form>
            </Modal>
            
        </StyledResourceForm>
    )
}

