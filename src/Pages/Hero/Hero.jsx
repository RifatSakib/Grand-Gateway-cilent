import React from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bgg.png";
import appStore from "../../assets/apple.png";  // Add the correct path
import playStore from "../../assets/playstore.png"; // Add the correct path
import AOS from 'aos';
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

const Hero = () => {
  return (
    <div className=" py-8 md:py-14">


    <div
      className="relative w-full h-[70vh] md:h-[50vh]"
      
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          height: "100%", // Fills parent div (50vh)
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="mb-5 text-xl md:text-3xl font-bold">We Are Now Available on</h1>

        {/* App Store and Play Store Buttons */}
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          <div data-aos="fade-up" data-aos-duration="3000"  className= "flex gap-2 bg-black p-4 rounded-xl">

            <img src={appStore} alt="App Store" className="h-12" />

            <div>

              <p>
                Download on the
              </p>
              <p>App Store</p>
            </div>

          </div>


          <div data-aos="fade-up" data-aos-duration="3000"  className="flex gap-2 bg-black p-4 rounded-xl">

            <img src={playStore} alt="Google Play" className="h-12" />

            <div>

              <p>
                Download on the
              </p>
              <p>Play Store</p>
            </div>

          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Hero;