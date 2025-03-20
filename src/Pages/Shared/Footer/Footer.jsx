import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import UseAdmin from '../../../Hooks/UseAdmin';
import UseDeliveryman from '../../../Hooks/UseDeliveryman';
import { Link } from 'react-router-dom';
import { BiLogoGmail } from "react-icons/bi";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {

  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [isDeliveryman, isDeliverymanLoading] = UseDeliveryman();


  return (

    <>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content mt-4 md:mt-8 p-10">
      <aside>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current">
          <path
            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>
          <span className='text-orange-400 text-xl font-bold'>Grand-Gateway</span>
          <br />
          Providing reliable service since 2021
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Option</h6>
        {
          user ? (
            isAdmin ? (

              <Link to="/dashboard/statistics" className="link link-hover">
                📊 Admin Dashboard
              </Link>
            )

              :

              (
                isDeliveryman ? (
                  <Link to="/dashboard/myDeliveryList" className="link link-hover ">
                    🚚 My Dashboard
                  </Link>
                )
                  :
                  (<Link to="/dashboard/bookaparcel" className="link link-hover">
                    📦 My Dashboard
                  </Link>)

              )


          )
            :

            (<Link to="/dashboard/bookaparcel" className="link link-hover">
              📦 My Dashboard
            </Link>)

        }

      </nav>
      <nav>
        <h6 className="footer-title ">About</h6>
        <a href='https://md-sakib-hossain-rifat.web.app/' className="link link-hover ">CEO</a>

      </nav>

      <form>
        <h6 className="footer-title">Contact</h6>
        <fieldset className="form-control w-80" >
          <label className="label flex-col justify-start items-start p-0 m-0 gap-2">
          

            <div className='w-full pr-4'>


              <a href="mailto:sakibrifat353@gmail.com" className="btn bg-gradient-to-b from-gray-300 via-gray-200 to-white bg-opacity-20 backdrop-blur-lg shadow-lg  w-full text-black"> <BiLogoGmail /> sakibrifat353@gmail.com</a>
            </div>

            <div className='w-full pr-4'>


              <a href="https://wa.me/8801791634313" className="btn bg-gradient-to-b from-gray-300 via-gray-200 to-white bg-opacity-20 backdrop-blur-lg shadow-lg  w-full text-black"> <FaSquareWhatsapp />
              +8801791634313</a>
            </div>

          </label>

        </fieldset>
      </form>
    </footer>


    <footer className="bg-base-300 text-base-content p-6 w-full flex justify-center items-center">
      <p className="text-lg font-medium text-center">
        © {new Date().getFullYear()} All Rights Reserved | Developed by Rifat Sakib
      </p>
    </footer>


</>


  );
};

export default Footer;