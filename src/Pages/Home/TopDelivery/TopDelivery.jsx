import React, { useContext } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
const TopDelivery = () => {
const axiosSecure = UseAxiosSecure();
const axiosPublic = UseAxiosPublic();
  const { data: users = [], refetch,error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/all');
            return res.data;
        }
    })

//     if (error) {
//         console.error("Error fetching bookings:", error);
//       }



const { data: bookData =[], isLoading: loading } = useQuery({
    queryKey: ['bookedparcel'], // Use a unique queryKey
    queryFn: async () => {
      const res = await axiosPublic.get(`/book/all/forbanner`);
      return res.data;
    },
    // Ensures it only runs when user.email exists
  });


  const { data: deliveredbookdata =[] } = useQuery({
    queryKey: ['abchf'], // Use a unique queryKey
    queryFn: async () => {
      const res = await axiosPublic.get(`/book/all/forbanner/delivered`);
      return res.data;
    },
    // Ensures it only runs when user.email exists
  });

  console.log(deliveredbookdata.length)
     
    return (
        <>

        {/* statics cards */}
        <div className='bg-[#D0DDD0] grid md:grid-cols-3 gap-4 py-10 px-5 '>

       



{/* ------------map use kora lagbe------------------------ */}

{/* card 1 */}
            <div className="card glass bg-black  bg-opacity-70 py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title text-xl justify-center text-white ">Total NO. of Parcels Booked</h2>
                   
                    <h2 className="card-title text-xl justify-center text-yellow-400 font-extrabold "> <CountUp end={bookData.length} /></h2>
                    
                </div>
            </div>

            {/* card 2 */}
            <div className="card glass bg-black  bg-opacity-70 py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title text-xl justify-center text-white ">Total No. of Parcels Delivered</h2>
                   
                    <h2 className="card-title text-xl justify-center text-red-400 font-extrabold "> <CountUp end={deliveredbookdata.length} /></h2>
                    
                </div>
            </div>


            {/* card 3 */}
            <div className="card glass bg-black  bg-opacity-70 py-4">
                

                <div className="card-body pt-0 flex-grow-0">
                    <h2 className="card-title text-xl justify-center text-white ">Total No. Of People</h2>
                   
                    <h2 className="card-title text-xl justify-center text-green-400 font-extrabold"> <CountUp end={users.length} /></h2>
                    
                </div>
            </div>

        </div>


    </>
    );
};

export default TopDelivery;