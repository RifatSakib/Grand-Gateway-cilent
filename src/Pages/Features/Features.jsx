import React from 'react';
import { IoFlashOutline, IoLocation, IoShieldCheckmarkOutline } from "react-icons/io5";
import CountUp from 'react-countup';
import AOS from 'aos';
import { GoLocation } from 'react-icons/go';
import 'aos/dist/aos.css';



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

const Features = () => {
    return (
        <>

            {/* statics cards */}
            <div

                className='grid md:grid-cols-3 gap-4 py-10 px-5 '>

                {/* card 1 */}
                <div
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="1000"

                    className="card glass bg-[#AAB99A]  ">
                    <div className='text-5xl mx-auto my-4 text-white'>


                        <GoLocation />

                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title text-xl md:text-3xl justify-center text-black">Real-Time Tracking</h2>
                        <p className='text-justify text-gray-600'>Stay informed every step of the way! Our real-time tracking feature allows you to monitor your parcel's journey from pickup to delivery, ensuring peace of mind.</p>
                    </div>
                </div>

                {/* card 2 */}
                <div

                    data-aos="fade-down"
                    data-aos-delay="100"
                    data-aos-duration="1000"

                    className="card glass bg-[#99a78b]  ">
                    <div className='text-5xl mx-auto my-4 text-white'>

                    <IoShieldCheckmarkOutline />


                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title  text-xl md:text-3xl justify-center text-black ">Parcel Safety</h2>
                        <p className='text-justify text-gray-600'>Your parcels are in safe hands! Our delivery personnel are thoroughly vetted and trained to ensure secure handling and delivery of your items.</p>
                    </div>
                </div>

                {/* card 3 */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                    className="card glass bg-[#838f76] ">
                    <div className='text-5xl mx-auto my-4 text-white '>

                    <IoFlashOutline />


                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title  text-xl md:text-3xl justify-center text-black">Super Fast Delivery</h2>
                        <p className='text-justify text-gray-600'>Experience lightning-fast delivery! With our optimized routes and dedicated delivery personnel, your parcels reach their destination in record time.</p>
                    </div>
                </div>





            </div>


        </>
    );
};

export default Features;