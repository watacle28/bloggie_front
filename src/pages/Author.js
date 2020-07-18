import React,{useEffect} from 'react'
import { FaFacebook,FaRegHeart, FaTwitter, FaInstagram, FaLinkedin,  FaPencilAlt,  FaRegComments, FaMapMarkerAlt, FaCalendarAlt, FaLinkedinIn } from 'react-icons/fa'
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux'
import { getSingleBlogger } from '../redux/actions/user'
import { Link } from 'react-router-dom';
import { CustomButton } from '../components/CustomButtom';
import { motion } from 'framer-motion';


const Container = styled(motion.div)`
   width: 100%;
   padding: auto 1rem;
    h5{
        
        color: #e24727;

    }
   
    @media screen and (min-width: 768px){
       width: 80%;
    }
    `
const Socio = styled.div`
width: max-content;
padding: .5rem 1rem;
margin-top: 1rem;
display: flex;
align-items: center;
 a{color : rgba(255,255,255,.2);}
box-shadow: var(--box-shadow);
border-radius: 200px;
svg{
    margin-right: 1rem;
   
}
`

const StyledPost =  styled.div`
    margin: .5rem;
    border: 1px solid rgba(255,255,255,.2) ;
    /* box-shadow: 2px 2px 31px 0px rgba(227,199,227,0.1); */
    width: 100%;
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    
    img{
        width:100%;
        border-radius: 0;
    }

`


const PostContent = styled.div`
    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
   align-items: stretch;
    justify-content: space-between;
     h6{
         text-transform: uppercase;
         color: #e24727
     }
    

`
const Date = styled(motion.p)`
        color: rgba(255,255,255,.2)
    `

const PostFooter = styled.div`
    width: 100%;
    display: flex;
    
    justify-content: space-between;
    
`


const Profile = styled.div`
     width: 100%;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     .header{
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         h5{
             text-transform: capitalize;
             font-weight: bolder;
             margin: .5rem auto;
         }
         h6{
             color: rgba(255,255,255,.2);
         }
     }
     .loc_joined{
         display: flex;
         width: 100%;
        justify-content: flex-start;
        align-items: center;
        color: rgba(255,255,255,.2);
        div{
            margin-right: 2rem;
            display: flex;
            align-items: center;
        }
        svg{
            margin-right: .5rem;
        }
     }
     .posts{
       color: rgba(255,255,255,.2);
         .num{
             font-weight: bolder;
             color: #fff;
         }
     }
`



export const Author = (props) => {
    const currentBlogger = useSelector(state => state.bloggers && state.bloggers.currentBlogger)
    const loggedInBlogger = useSelector(state => state.auth && state.auth.userData && state.auth.userData._id)
    const dispatch = useDispatch()
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    const links = [
        {icon: <FaFacebook/>, href: 'https://facebook.com'},
        {icon: <FaTwitter/>, href: ' https://twitter.com'},
        {icon: <FaLinkedinIn/>, href: ' https://linkedin.com'},
        {icon: <FaInstagram/>, href: ' https://instagram.com'},

    ]
    dayjs.extend(relativeTime)
    useEffect(() => {
      dispatch(getSingleBlogger(props.match.params.id))
      
    }, [dispatch,props.match.params.id])
    return (
      <Container>
      {currentBlogger &&  
      
        <div>
        <Profile>  
              <div className="header">
              <div className="left">
              <Avatar src={currentBlogger.avatar} name ={currentBlogger.username} textSizeRatio={2} size={150} round={true} />
                <h5>{currentBlogger.fullname ? currentBlogger.fullname : null}</h5>
                <h6>@{currentBlogger.username}</h6>
              </div>
              <div className="coa-edit">
              {currentBlogger._id === loggedInBlogger ?
             <Link to ={`/profile/${loggedInBlogger}`}><CustomButton secondary ><FaPencilAlt/> {'  '}<span>Edit Profile</span></CustomButton></Link> : null}
              </div>
              </div>
                 {currentBlogger.role && <span>{currentBlogger.role}</span>}
                 <div className="loc_joined">
                 {currentBlogger.location && <div><FaMapMarkerAlt/> <span>{currentBlogger.location}</span></div>}
                 <div><FaCalendarAlt/><span>{currentBlogger.joined ? currentBlogger.joined : `joined 28 June 1989`}</span></div>
                 </div>
                 <div className="posts">
               
                 <span className="num">{currentBlogger.posts.length}</span> <span>{currentBlogger.posts.length === 1 ? 'Post' : 'Posts'}</span>
                </div>
           
            <Socio className="socio-icons">
             {links.map((link,i)=> <a href={link.href}>{link.icon}</a>)}
            </Socio>
            <p style={{ textAlign: 'justify', marginTop:'1rem', textTransform:'capitalize'}}>{currentBlogger.bio && currentBlogger.bio}</p>

          
           
        </Profile>
         
          <div>
          {currentBlogger.posts.map(post =>(
                <StyledPost>
               
                <PostContent>
                    <h6>{post.title}</h6>
                    <PostFooter>
                  
           <div><FaRegComments/><span>{'  '}</span>{post.comments.length}</div>
           <div> <FaRegHeart/> <span>{'  '}</span>{post.likes.length} </div>
                    </PostFooter>
                    <Date> 
                    {dayjs(post.createdAt).date() } 
                    <span>{' '}</span>
                    {month[dayjs(post.createdAt).month()]}
                    <span>{' '}</span>
                    {dayjs(post.createdAt).year()}
                    </Date>
                    <Link to={`/post/${post._id}`}>READ MORE...</Link>
                </PostContent>
            </StyledPost>
           ))}
          </div>
         
        </div>}
      </Container>
    )
}
