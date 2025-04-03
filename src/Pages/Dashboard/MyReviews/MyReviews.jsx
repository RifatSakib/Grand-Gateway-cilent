import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyReviews = () => {

    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();


    const { data: deliveryman = {}, isLoading: isDeliverymanLoading } = useQuery({
        queryKey: [user?.email, 'deliveryman'],
        enabled: !loading && !!user?.email, // Ensure user is logged in
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/oneDeliveryman/${user.email}`);
            return res.data.user || {}; // Ensure this returns an object
        }
    });



    const { data: myReview = [], isLoading: isBooksLoading, refetch } = useQuery({
        queryKey: [deliveryman?._id, 'myReview'],
        enabled: !!deliveryman?._id, // Ensure deliveryman ID is available
        queryFn: async () => {
            if (!deliveryman?._id) {
                return []; // Return an empty array if no deliveryman ID
            }
            const res = await axiosSecure.get(`/review/${deliveryman._id}`);
            return res.data || []; // Ensure this returns an array
        }
    });

    console.log(deliveryman?._id)
    console.log(myReview)




    return (
        <div>


            <h1 className='text-3xl font-bold text-center p-10'>My Reviews</h1>
            <div className='grid grid-cols-1 md:grid-col-3 lg:grid-cols-4   gap-2'>

                {

                    myReview.map(item =>  


                <div key={item._id} className="card bg-base-100 shadow-xl p-3  border border-black">
                    <div className="flex items-center mb-4">

                        <img
                            className="rounded-full w-16 h-16 object-cover mr-4"
                            src={item.image}

                        />


                        <div>
                            <h2 className="text-lg font-semibold"> {item.name}</h2>
                            <p> <span className='text-gray-500'>Date:</span> <br /> {item?.date} </p>
                            <p> <span className='text-gray-500'>Rating out of 5:</span> <br /> <span className='text-orange-400'>{item?.ratings}</span>  </p>


                        </div>






                    </div>
                    <p className="text-sm text-justify overflow-y-auto h-24"> <span className='text-gray-500'>Feedback:</span> <br /> {item.feedBack}</p>

                </div>
                    )

                }




            </div>

        </div>
    );
};

export default MyReviews;