import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import Features from '../../Features/Features';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Grand-Gatewy | Home</title>
            </Helmet>

          <Banner></Banner>
          <Features></Features>



        </div>
    );
};

export default Home;