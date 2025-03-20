import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import Features from '../../Features/Features';
import TopDelivery from '../TopDelivery/TopDelivery';
import Slides from '../../Slides/Slides';
import Accordion from '../../Accordion/Accordion';
import Hero from '../../Hero/Hero';

const Home = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Grand-Gatewy | Home</title>
            </Helmet>

            <Slides className="w-full"></Slides>
            <Banner ></Banner>
            <Features></Features>
            <TopDelivery></TopDelivery>
            <Accordion></Accordion>
            <Hero></Hero>



        </div>
    );
};

export default Home;