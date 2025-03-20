import React, { useContext } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoMdNotificationsOutline, IoMdPerson } from 'react-icons/io';
import { CiDeliveryTruck } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';



AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});








const TopDelivery = () => {
const axiosSecure = UseAxiosSecure();
const axiosPublic = UseAxiosPublic();

const { data: users = {}, refetch, error } = useQuery({
    queryKey: ['count'],
    queryFn: async () => {
        const res = await axiosPublic.get('/users/all');
        return res.data; // This will now be { count: number }
    }
});







const { data: bookData ={}, isLoading: loading } = useQuery({
    queryKey: ['bookedparcel'], // Use a unique queryKey
    queryFn: async () => {
      const res = await axiosPublic.get(`/book/all/forbanner`);
      return res.data;
    },
  });


  const { data: deliveredbookdata = {} } = useQuery({
    queryKey: ['deliveredBooksCount'], // ✅ Use a descriptive key
    queryFn: async () => {
        const res = await axiosPublic.get('/book/all/forbanner/delivered');
        return res.data; // ✅ Expecting an object { count: number }
    },
});

  console.log(deliveredbookdata.count)
     
    return (
        <>

        {/* statics cards */}
        <div className=' grid md:grid-cols-3 gap-4 py-8 md:py-14 w-11/12 mx-auto px-5 '>

       



{/* ------------map use kora lagbe------------------------ */}

{/* card 1 */}
            <div 
            data-aos="zoom-in"  
            data-aos-delay="100"
            data-aos-duration="1000"

            className="card glass  bg-[#AAB99A]  py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title  text-xl md:text-3xl justify-center text-black">Total Parcels Booked</h2>
                   
                    <h2 className="card-title  text-2xl md:text-4xl justify-center text-white font-extrabold "> <CountUp end={bookData?.count || 0} /> <span className='text-white '><IoMdNotificationsOutline /></span></h2>
                    
                </div>
            </div>

            {/* card 2 */}
            <div 
            data-aos="zoom-in"  
            data-aos-delay="100"
            data-aos-duration="1000"

            className="card glass bg-[#99a78b]  py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title  text-xl md:text-3xl justify-center text-black">Total Parcels Delivered</h2>
                   
                    <h2 className="card-title  text-2xl md:text-4xl justify-center text-white  font-extrabold "> <CountUp end={deliveredbookdata?.count || 0} /> <span className='text-white'><CiDeliveryTruck /></span></h2>
                    
                </div>
            </div>


            {/* card 3 */}
            <div 
            data-aos="zoom-in"  
            data-aos-delay="100"
            data-aos-duration="1000"

            className="card glass bg-[#838f76] py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title  text-xl md:text-3xl justify-center text-black ">Total People </h2>
                   
                    <h2 className="card-title  text-2xl md:text-4xl justify-center text-white font-extrabold"> <CountUp end={users?.count || 0} /> <span className='text-white'><BsPerson /></span></h2>
                    
                </div>
            </div>

        </div>


    </>
    );
};

export default TopDelivery;