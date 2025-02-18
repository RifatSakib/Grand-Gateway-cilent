import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllDeliveryMan = () => {

    const axiosSecure = UseAxiosSecure();

    const [deliveryManId, setDeliveryManId] = useState([]);

    const { data: deliveryman = [] } = useQuery({
        queryKey: ['deliveryman'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/deliverymen');
            return res.data;
        }
    });


console.log(deliveryman)




    



    return (
        <div className='w-8/12 flex flex-col w-full relative'>


            <div className="text-center">
                <h1 className="text-5xl font-bold">All Deliveryman {deliveryman.length}</h1>
            </div>

            <div className="overflow-x-auto py-7 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Delivery Man's Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcels delivered</th>
                            <th>Average review</th>

                        </tr>
                    </thead>
                    <tbody>
                        {deliveryman.map((item, index) => (




                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.phone}</td>
                                <td>{item?.deliveredCount}</td>
                                <td>{item?.averageRating}</td>


                            </tr>



                           


                        ))}
                    </tbody>
                </table>
            </div> 





        </div>
    );
};

export default AllDeliveryMan;