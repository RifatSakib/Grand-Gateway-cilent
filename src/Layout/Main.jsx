import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar />
  
        <div className="flex-grow">
          <Outlet />
        </div>
  
        <Footer/>
      </div>
    );
};

export default Main;