import React from 'react';
import bannerImage from '../../../assets/banner.jpg'

const Banner = () => {
    return (
        <div
            className="hero min-h-screen pt-10 md:pt-0"
            style={{
                backgroundImage: `url(${bannerImage})`,
            }}>
            <div className="hero-overlay bg-opacity-0"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold pt-12 text-white">Your Parcel,<span className='text-orange-500'>Our Promise!</span></h1>
                    <p className="mb-5 text-gray-400">
                        Fast, reliable, and hassle-free delivery solutions. Book now and let us handle the rest!
                    </p>

                    {/* search bar */}
                    <div className="join">
                        <input className="input input-bordered text-black join-item" placeholder="Search Here" />
                        <button className="btn join-item rounded-r-full"><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg></button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Banner;