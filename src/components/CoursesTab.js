import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Modal } from './modal'
import { CustomButton } from './CustomButtom'
import { Form, StyledResourceForm } from './ResourceForm'
import { FaPlusCircle } from 'react-icons/fa'
import { getAllCourses } from '../redux/actions/resources'

export const CoursesTab = ({clicks,setClicks,open,handleOpen}) => {
    const courses = useSelector(state => state.courses)
    const [courseDetails, setCourseDetails] = useState({name:'',link:'',duration:'',price:''})
   
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        setCourseDetails({...courseDetails,[e.target.name]: e.target.value})
    }
    const addCourse = (e)=>{
        e.preventDefault()
        console.log({courseDetails})
    }
    useEffect(() => {
       if(clicks.coursesTab === 0)
        {
        dispatch(getAllCourses())
        }
        setClicks({...clicks, coursesTab:1})
    }, [])
    return (
        <StyledResourceForm>
            <h5>Suggested Courses</h5>
            <Modal  open={open} setOpen={handleOpen}>
               <Form autoComplete ='off' onSubmit={addCourse}>
                <h5>Enter Course details</h5>
               <label htmlFor="name">Course Title</label>
                <input type="text" id="name" name="name" value={courseDetails.name} onChange={ handleChange}/>
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" value={courseDetails.link} onChange={ handleChange}/>
                <label htmlFor="duration">Course Duration</label>
                <input type="text" id="duration" name="duration" value={courseDetails.duration} onChange={ handleChange}/>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" value={courseDetails.price} onChange={ handleChange}/>
                <CustomButton type='submit'>Save</CustomButton>
               </Form>
              
            </Modal>
            List of courses
            <button title='add new course' id='add_btn' onClick={()=>handleOpen(true)}><FaPlusCircle/></button>
        </StyledResourceForm>
    )
}
