import React from 'react';
import Bg from "../../assets/lottie/delivery1.json"
import Bg2 from "../../assets/lottie/deliver2.json"
import Lottie from 'lottie-react';
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


const Slides = () => {
    return (
        <div className='w-full md:min-h-screen mx-auto pb-0 mb-0'>
                <div data-aos="fade-down"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                     className="carousel w-full pb-0">

                    {/* slide 1 */}

                    <div id="slide1" className="carousel-item relative w-full p-0 m-0">

                        <div className=' m-10 md:flex gap-4 p-4'>

                            <div className='w-full'>

                            <Lottie animationData={Bg2}></Lottie>

                            </div>

                            <div className='w-full my-auto space-y-5 '>
                                <div className='w-[80%] mx-auto space-y-5'>
                                    <h1 className=' font-bold'>Get Your Packages Delivered in No Time!</h1>
                                    <h1 className='text-[#7f8b73] text-4xl font-bold'>Fast & Secure Parcel Delivery!</h1>
                                    <p className='text-slate-400 text-justify'>Experience seamless parcel booking with real-time tracking, top-rated delivery professionals, and guaranteed security. Whether it's a small gift or a large shipment, we've got you covered!</p>

                                   
                                </div>



                            </div>

                        </div>




                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>



                    {/* slide 2 */}

                    <div id="slide2" className="carousel-item relative w-full">

                        <div className='m-10 md:flex gap-4 p-4'>


                        <div className='w-9/12 mx-auto md:ml-10 md:mt-10'>
                            <Lottie animationData={Bg}></Lottie>

                            </div>



                            <div className='w-full space-y-5 my-auto  '>
                                <div className='w-[80%] mx-auto space-y-5'>
                                    <h1 className=' font-bold'>Book. Track. Deliver. All in One Place!</h1>
                                    <h1 className='text-[#7f8b73] text-4xl font-bold'>Hassle-Free Parcel Booking at Your Fingertips!</h1>
                                    <p className='text-slate-400 text-justify'>Our user-friendly platform ensures a smooth booking process, live tracking, and secure deliveries. Enjoy quick parcel management with a powerful dashboard built just for you!</p>

                                  
                                </div>



                            </div>


                            

                        </div>



                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between ">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>


                    {/* slide 3 */}

                    <div id="slide3" className="carousel-item relative w-full">

                        <div className=' m-10 md:flex gap-4 p-4'>

                            <div className='w-full'>

                            <Lottie animationData={Bg2}></Lottie>

                            </div>

                            <div className='w-full space-y-5 my-auto  '>
                                <div className='w-[80%] mx-auto space-y-5'>
                                    <h1 className=' font-bold'>Reliable, Fast, and Affordable Delivery Solutions!</h1>
                                    <h1 className='text-[#7f8b73] text-4xl font-bold'>Your Trusted Parcel Delivery Partner!</h1>
                                    <p className='text-slate-400 text-justify'>Whether you're sending a package across town or across the country, our professional delivery network ensures timely and safe deliveries. Join thousands of satisfied users today!</p>

                                    
                                </div>

                            </div>

                        </div>


                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>







                </div>

            </div>
    );
};

export default Slides;