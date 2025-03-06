import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import Features from '../../Features/Features';
import TopDelivery from '../TopDelivery/TopDelivery';
import Slides from '../../Slides/Slides';
import Accordion from '../../Accordion/Accordion';

const Home = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Grand-Gatewy | Home</title>
            </Helmet>

            <Slides></Slides>
            <Banner ></Banner>
            <Features></Features>
            <Accordion></Accordion>
            <TopDelivery></TopDelivery>



        </div>
    );
};

export default Home;