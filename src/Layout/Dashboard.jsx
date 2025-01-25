import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import UseAdmin from '../Hooks/UseAdmin';
import UseDeliveryman from '../Hooks/UseDeliveryman';


const Dashboard = () => {



    // TODO: get isAdmin value from the database
    const [isAdmin] = UseAdmin();

    const [isDeliveryman] = UseDeliveryman();


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/parcels">
                                    <FaHome></FaHome>
                                    All Parcels</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUtensils></FaUtensils>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/deliveryman">
                                    <FaList></FaList>
                                    All Delivery Men</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/statistics">
                                    <FaBook></FaBook>
                                    Statistics</NavLink>
                            </li>

                        </>
                            :

                            isDeliveryman?
                            <>
                              <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        My Delivery List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        My Reviews</NavLink>
                                </li>
                              
                            </> 
                            :

                            <>
                                <li>
                                    <NavLink to="/dashboard/bookaparcel">
                                        <FaHome></FaHome>
                                        Book a Parcel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myparcels">
                                        <FaCalendar></FaCalendar>
                                        My Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Profile </NavLink>
                                </li>
                                
                            </>
                    }





                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;