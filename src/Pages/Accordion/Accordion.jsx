import React from 'react';
import 'aos/dist/aos.css';
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

const Accordion = () => {
    return (
        <div data-aos="fade-up"
        data-aos-duration="2000"
        className= ' py-8 md:py-14 flex flex-col gap-2 w-11/12 mx-auto px-5'>

        <h1 className='text-xl md:text-3xl text-center font-bold pb-4'>Frequently Asked Questions</h1>

            <div className="collapse bg-[#AAB99A]">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium text-white font-bold">Why Grand-Gateway is the Ultimate Parcel Solution?</div>
                <div className="collapse-content">
                    <p className='text-black'> <b>Effortless Parcel Booking:</b> With just a few clicks, book your parcels for delivery anytime, anywhere. No complicated forms or long wait times – just a smooth and easy process. <br />
                        <b>Unmatched Speed & Reliability:</b> Trust that your parcels will reach their destination fast and securely with our top-tier delivery team. We ensure your items are handled with care, delivering with precision and on time.
                        <br /><b>Real-Time Tracking & Notifications:</b> Stay in the loop at all times. Receive instant notifications about the status of your parcel from booking to delivery, so you’re never left wondering. <br />
                        <b>Easy Payments, Seamless Experience:</b> Pay for your services easily with secure online payment options. Plus, get a smooth checkout experience that guarantees your peace of mind.
                        <br /><b>Safe and Secure:</b> We prioritize the safety of your parcels. Whether it’s fragile or time-sensitive, you can count on Grand-Gateway for reliable and secure delivery.</p>


                </div>
            </div>
            <div className="collapse bg-[#99a78a]">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium text-white font-bold" >Why Choose Our Advanced User Dashboard?</div>
                <div className="collapse-content">
                    <p className='text-black'><b>Complete Control at Your Fingertips:</b> Manage all your parcels in one place! Book, track, update, or cancel parcels, and keep tabs on every detail through your personalized dashboard. <br /> <b>Get Instant Updates:</b> You’ll always know the latest on your parcels. With automated notifications, you can track delivery statuses, view estimated delivery times, and get alerts every step of the way. <br /> <b>Track Your Delivery History:</b> View and manage all your past bookings and deliveries with ease. Your parcel journey is always just a click away. <br /> <b>Customized Experience:</b> From your profile picture to your parcel booking preferences, customize your dashboard to match your style and needs, making your experience truly yours. <br /> <b>Exclusive Features:</b> Receive special discounts, promo offers, and loyalty rewards directly through your dashboard for even more savings.</p>
                </div>
            </div>
            <div className="collapse bg-[#7f8b73]">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium text-white font-bold">Why Grand-Gateway is Perfect for Admins?</div>
                <div className="collapse-content">
                    <p className='text-black'><b>Powerful Analytics for Smart Decisions:</b> Get access to real-time data and insightful analytics that help you manage deliveries, parcels, and user activity efficiently. <br /> <b>Streamlined Delivery Management:</b> Assign and monitor deliveries with ease. Admins can instantly allocate parcels to delivery men, track progress, and ensure timely delivery. <br /> <b>Organize Users & Deliveries Seamlessly:</b> Easily manage all users and delivery men, adjusting roles or tracking activities, making it simple to scale your operations. <br /> <b>Efficient Parcel Assignment:</b> Manage all parcel bookings with an easy-to-use interface. Assign delivery personnel, set delivery dates, and handle cancellations swiftly and without hassle. <br /> <b>Actionable Insights with Reporting:</b> Track performance trends, booking frequency, delivery times, and customer satisfaction to continuously optimize your service.</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;