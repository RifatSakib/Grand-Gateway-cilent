import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import Features from '../../Features/Features';
import TopDelivery from '../TopDelivery/TopDelivery';

const Home = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Grand-Gatewy | Home</title>
            </Helmet>

          <Banner ></Banner>
          <Features></Features>
          <TopDelivery></TopDelivery>



        </div>
    );
};

export default Home;