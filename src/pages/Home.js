import React, {Suspense, lazy} from 'react';
import styled from 'styled-components';
//import bg from '../components/bg.jpg'
import {Hero} from '../components/Hero'
import { Loader } from './SinglePost';
import { Spinner } from '../components/Loader';

//import { CardsContainer } from '../components/CardsContainer';
const CardsContainer = lazy(()=> import('../components/CardsContainer'))
const Hom = styled.div`
  padding-top: 2rem;

`
export const Home = () => {
 
  
    return (
      <Hom>
      
       <Suspense fallback = {<Spinner/>}>
           <Hero/>
           <CardsContainer/>
          
       </Suspense>
      
      </Hom>
    )
}
