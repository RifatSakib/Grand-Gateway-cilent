import React from 'react';
import { IoLocation } from "react-icons/io5";
import CountUp from 'react-countup';

const Features = () => {
    return (
        <>

            {/* statics cards */}
            <div className='grid md:grid-cols-3 gap-4 py-10 px-5 '>

                {/* card 1 */}
                <div className="card glass bg-[#AAB99A]  ">
                    <div className='text-5xl mx-auto my-4 '>


                        <img width="48" height="48" src="https://img.icons8.com/fluency/48/marker.png" alt="marker" />
                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title text-3xl justify-center ">Real-Time Tracking</h2>
                        <p className='text-justify text-gray-600'>Stay informed every step of the way! Our real-time tracking feature allows you to monitor your parcel's journey from pickup to delivery, ensuring peace of mind.</p>
                    </div>
                </div>

                {/* card 2 */}
                <div className="card glass bg-[#AAB99A] ">
                    <div className='text-5xl mx-auto my-4 '>

                        <img width="48" height="48" src="https://img.icons8.com/emoji/48/shield-emoji.png" alt="shield-emoji" />
                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title text-3xl justify-center ">Parcel Safety</h2>
                        <p className='text-justify text-gray-600'>Your parcels are in safe hands! Our delivery personnel are thoroughly vetted and trained to ensure secure handling and delivery of your items.</p>
                    </div>
                </div>

                {/* card 3 */}
                <div className="card glass bg-[#AAB99A] ">
                    <div className='text-5xl mx-auto my-4 '>

                        <img width="48" height="48" src="https://img.icons8.com/emoji/48/high-voltage.png" alt="high-voltage" />
                    </div>

                    <div className="card-body pt-0 flex-grow-0">
                        <h2 className="card-title text-3xl justify-center ">Super Fast Delivery</h2>
                        <p className='text-justify text-gray-600'>Experience lightning-fast delivery! With our optimized routes and dedicated delivery personnel, your parcels reach their destination in record time.</p>
                    </div>
                </div>





            </div>


        </>
    );
};

export default Features;