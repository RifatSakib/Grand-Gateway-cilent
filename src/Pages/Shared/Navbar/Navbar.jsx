import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../../../assets/user2.png'
import { RxAvatar } from "react-icons/rx";
import '../../../App.css'
import logo from "../../../assets/motorbike.png"
import { AuthContext } from '../../../Providers/AuthProvider';

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }

  const links = <>

    <li className='font-bold text-lg text-white'><NavLink to="/">Home</NavLink></li>

  </>


  return (
    <div className="navbar fixed max-w-screen-xl bg-[#727D73] bg-opacity-80 z-10">
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
          <a className="btn btn-ghost text-2xl text-white font-bold">Grand -<span className='text-orange-500'>Gateway</span> </a>
          <img className='w-10' src={logo} alt="" />
        </div>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-2">

        <div>
          <button className='btn btn-success text-white'>hey</button>
        </div>
        <div className="login flex gap-2 items-center">
          <div className=" ">
            {user && user?.email ? (
              <div>
               

                <details className="dropdown w-[80%]">
                  <summary className="border-none m-1 p-0"> <img className="w-10 rounded-full" src={user?.photoURL} alt="" /></summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
                    <li className=' cursor-not-allowed bg-none pl-3 '>{user.displayName}</li>
                    <li><a>Item 2</a></li>
                  </ul>
                </details>


                {/* <p>{user.displayName}</p> */}
              </div>
            ) : (
              //   <img className='text-white' src={userIcon} alt="" />
              <span className='text-5xl'> <RxAvatar /> </span>
            )}
          </div>
          {user && user?.email ? (
            <button onClick={handleLogOut} className="btn btn-neutral rounded-none">
              Log-Out
            </button>
          ) : (
            <Link to="/login" className="btn btn-neutral rounded-none text-white">
              Login
            </Link>
          )}






        </div>

      </div>
    </div>
  );
};


export default Navbar;