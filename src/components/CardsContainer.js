import React ,{useEffect,useRef,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Card} from './Card';
import { getAllPosts } from '../redux/actions/posts';



export const Container = styled.div`
margin-top: -4rem;

position: relative;
height: auto;
width: 100%;
padding: 1rem;
scroll-behavior: smooth;
margin: -100px auto 0 auto;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
border-radius: 20px;
display: flex;
flex-direction: column;
h3{
    color: white;
    letter-spacing: 2px;
}
@media screen and (min-width: 700px){
    margin: 2rem auto;
}
`

const CardsContainer = () => {
    const dispatch = useDispatch();
    const allposts = useSelector(state=>state.posts.posts)
    const loadingPosts = useSelector(state => state.posts.loading)

   
   
   

    useEffect(() => {
        dispatch(getAllPosts())
      
    }, [])

    return (
        <Container >
            <h3>Latest Posts:</h3>
            {!loadingPosts && allposts.map((post,i) => (<Card key={post._id} post={post} />))}
        </Container>
    )
}
export default CardsContainer;