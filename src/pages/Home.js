import React from 'react';
import styled from 'styled-components';
//import bg from '../components/bg.jpg'
import {Hero} from '../components/Hero'
import { CardsContainer } from '../components/CardsContainer';
const Hom = styled.div`
position: absolute;
background-color: tomato;
background-size:200%;
background-position-x:50%;
background-repeat: no-repeat;
top: 0;
left: 0;

`
export const Home = () => {
    return (
      <Hom>
       <Hero/>
       <CardsContainer/>
      </Hom>
    )
}
