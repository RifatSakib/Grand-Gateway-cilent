import React from 'react';
import bannerImage from '../../../assets/banner5.png'
import AOS from 'aos';

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


const Banner = () => {
    return (

        <div className=' py-8 md:py-14 pt-0'>

            <div
                className="hero md:min-h-screen h-80 mx-auto p-0 m-0"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    width: "80%"
                }}>


                <div className="hero-content text-neutral-content text-center">
                    <div data-aos="fade-right"
                        data-aos-delay="100"
                        data-aos-duration="1000"
                        className="max-w-3xl border p-4 text-white bg-white/20 backdrop-blur-md  border-white/30 shadow-lg rounded-xl ">

                        <h1

                            className="mb-5 text-4xl md:text-8xl pt-2 text-red-600 font-bold  md:font-extrabold  rounded-full">Grand-<span className='text-orange-500'>Gateway</span></h1>


                        <p


                            className="mb-5 text-lg md:text-3xl text-[#7F8B73] font-extrabold  inline px-2">
                            No More Delivery Hassles!!
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;