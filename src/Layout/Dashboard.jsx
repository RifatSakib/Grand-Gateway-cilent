import React, { useEffect, useState } from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import UseAdmin from '../Hooks/UseAdmin';
import UseDeliveryman from '../Hooks/UseDeliveryman';


const Dashboard = () => {

    // dark theme

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Handle Theme Toggle
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Apply stored theme on page load
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);




    // TODO: get isAdmin value from the database
    const [isAdmin] = UseAdmin();

    const [isDeliveryman] = UseDeliveryman();


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className=" md:w-2/12 min-h-screen bg-blue-400">
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

                            isDeliveryman ?
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
    {/* Theme Toggle Button */}
    <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
                   
                   transition-all md:px-4 md:py-3"
        onClick={toggleTheme} // Clicking anywhere toggles theme
    >
        {/* Icons */}
        <label className="swap swap-rotate">
            {/* Hidden checkbox to track state */}
            <input type="checkbox" checked={theme === "dark"} readOnly />

            {/* Sun Icon */}
            <svg
                className="swap-off h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon Icon */}
            <svg
                className="swap-on h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
        </label>

        {/* Dark Mode Text */}
        <p className="text-xs sm:text-sm md:text-base font-medium">Dark Mode</p>
    </div>
</li>


                </ul>
            </div>
            {/* dashboard content */}
            <div className=" md:w-10/12 flex-1 p-8 ml-2 md:ml-2 mt-12 sm:overflow-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;