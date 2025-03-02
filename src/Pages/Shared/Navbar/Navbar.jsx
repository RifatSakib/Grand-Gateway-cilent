import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../../../assets/user2.png'
import { RxAvatar } from "react-icons/rx";
import '../../../App.css'
import logo from "../../../assets/motorbike.png"
import { AuthContext } from '../../../Providers/AuthProvider';
import '../../../App.css'
import UseAdmin from '../../../Hooks/UseAdmin';
import UseDeliveryman from '../../../Hooks/UseDeliveryman';
import { CiBellOn } from 'react-icons/ci';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';




const Navbar = () => {

  const axiosSecure = UseAxiosSecure();
  const { user, logOut } = useContext(AuthContext);
  console.log(user?.photoURL);
  const [isAdmin] = UseAdmin();
  const [isDeliveryman] = UseDeliveryman();

  const { data: book = [], isPending: loading, refetch } = useQuery({
    queryKey: ['abcd', user?.email],
    enabled: !!localStorage.getItem('access-token'),
    queryFn: async () => {
      const res = await axiosSecure.get(`/book/email/${user.email}`);

      return res.data;
    }
  })


  //  for nav image upload
  // // Fetch the logged-in user's details
  const { data: userData } = useQuery({
    queryKey: ['userPhoto', user?.email], // Use a unique queryKey
    queryFn: async () => {
      if (!user?.email) return null; // Prevents API call if user is undefined
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!localStorage.getItem('access-token') && !!user?.email, // Ensures it only runs when user.email exists
  });







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





  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }

  const links = <>

    <li className='font-bold text-lg text-black lg:text-white'><Link to="/">Home</Link></li>

  </>


  return (
    <div className="navbar max-w-screen-xl md:fixed  bg-[#727D73] bg-opacity-80 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className='flex items-center'>
          <a className="text-xs px-1 md:px-5 md:text-2xl text-white font-bold">Grand -<span className='text-orange-500'>Gateway</span> </a>
          <img className='w-4 md:w-10' src={logo} alt="" />
        </div>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-2">

        {/* theme toggle button */}


        <label className="swap swap-rotate">
          {/* Hidden checkbox to track state */}
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />

          {/* sun icon */}
          <svg
            className="swap-off h-6 w-6 md:h-8 md:w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-6 w-6 md:h-8 md:w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>


        {/* ----------------- */}

        <div className=' px-2 md:px-10 flex flex-col items-center justify-center'>
          {/* <button className='btn btn-success text-white'>hey</button> */}

          <div className="indicator">
            <span className="indicator-item badge badge-secondary">{book?.length || 0}</span>
            <div className='text-2xl md:text-4xl '><CiBellOn /></div>

          </div>
        </div>
        <div className="login flex gap-2 items-center">
          <div className=" ">
            {user && user?.email ? (
              <div>


                <details className="dropdown leading-none  ">
                  <summary className="border-none m-1 p-0 outline-none">

                    {user && user?.photoURL &&  (
                      <div>
                        { user && userData?.image2 ? (
                          <img className="w-8 md:w-10 rounded-full" src={userData.image2} alt="User Profile" referrerPolicy='no-referrer' />
                        ) : user && user?.photoURL ? (
                          <img className="w-8 md:w-10 rounded-full" src={user.photoURL} alt="User Profile" referrerPolicy='no-referrer' />
                        ) : (
                          <span className="text-2xl md:text-4xl">
                            <RxAvatar />
                          </span>
                        )}
                      </div>
                    )}





                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow -ml-24">
                    <li className=' cursor-not-allowed bg-none pl-4 font-extrabold '>{user.displayName}</li>


                    {
                      user && isAdmin && <li className='text-yellow-500 font-bold'><Link to="/dashboard/statistics">Dashboard</Link></li>
                    }

                    {
                      user && isDeliveryman && <li className='text-yellow-500 font-bold'><Link to="/dashboard/myDeliveryList">Dashboard</Link></li>
                    }

                    {
                      user && !isDeliveryman && !isAdmin && <li className='text-yellow-500 font-bold'><Link to="/dashboard/bookaparcel">Dashboard</Link></li>
                    }


                    <Link to="/"> <li onClick={handleLogOut} className='text-red-500 font-bold'><a>Log-Out</a></li></Link>
                  </ul>
                </details>


              </div>
            ) : (
              //   <img className='text-white' src={userIcon} alt="" />
              <span className=' text-2xl md:text-5xl'> <RxAvatar /> </span>
            )}
          </div>


          {user && user?.email ?

            (

              <></>
            ) :

            (
              <Link to="/login" >
                <button className="btn btn-neutral rounded-none text-white w-10 md:w-20"> Login</button>
              </Link>
            )}






        </div>

      </div>
    </div>
  );
};


export default Navbar;