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
            <div className="w-[20%] min-h-screen bg-blue-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/allParcels">
                                    <FaHome></FaHome>
                                    All Parcels</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUtensils></FaUtensils>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allDeliveryman">
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
                                    <NavLink to="/dashboard/myDeliveryList">
                                        <FaHome></FaHome>
                                        My Delivery List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReview">
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
                                    <NavLink to="/dashboard/myprofile">
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
            <div className="w-[80%] flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;