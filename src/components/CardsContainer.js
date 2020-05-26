import React ,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Card} from './Card';
import { getAllPosts } from '../redux/actions/posts';

export const Container = styled.div`
margin-top: -4rem;
background-color: #161e20;
z-index: 100;
position: relative;
height: auto;
width: 80%;
padding: 1rem;
margin: -100px auto 0 auto;
box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
border-radius: 20px;
display: flex;
flex-direction: column;

`

const CardsContainer = () => {
    const dispatch = useDispatch();
    const allposts = useSelector(state=>state.posts.posts)
    const loadingPosts = useSelector(state => state.posts.loading)
    console.log({loadingPosts});
    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return (
        <Container>
            {!loadingPosts && allposts.map((post) => (<Link to={`/post/${post._id}`} key={post._id}><Card post={post} /></Link>))}
        </Container>
    )
}
export default CardsContainer;