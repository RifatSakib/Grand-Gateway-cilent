import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import UseDeliveryman from '../../../Hooks/UseDeliveryman';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyDeliveryList = () => {

    //   const { user, logOut } = useContext(AuthContext);

    //   const [isDeliveryman] = UseDeliveryman();

    //   console.log(isDeliveryman)



    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();


    // const { data: deliveryman = [], isPending: isDeliverymanLoading } = useQuery({
    //     queryKey: [user?.email, 'deliveryman'],
    //     enabled: !loading && !!user?.email,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/oneDeliveryman/${user.email}`);
    //         return res.data.user;
    //     }
    // })


    const { data: deliveryman = {}, isLoading: isDeliverymanLoading } = useQuery({
        queryKey: [user?.email, 'deliveryman'],
        enabled: !loading && !!user?.email, // Ensure user is logged in
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/oneDeliveryman/${user.email}`);
            return res.data.user || {}; // Ensure this returns an object
        }
    });


    //  const { data: bookByDeliveryId = [],  } = useQuery({
    //     queryKey: [deliveryman?._id, 'bookByDeliveryId'],
    //     enabled: !!deliveryman?._id,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/book/AllBookByDeliveryId/${deliveryman._id}`);
    //         return res.data.user;
    //     }
    // })


    const { data: bookByDeliveryId = [], isLoading: isBooksLoading } = useQuery({
        queryKey: [deliveryman?._id, 'bookByDeliveryId'],
        enabled: !!deliveryman?._id, // Ensure deliveryman ID is available
        queryFn: async () => {
            if (!deliveryman?._id) {
                return []; // Return an empty array if no deliveryman ID
            }
            const res = await axiosSecure.get(`/book/AllBookByDeliveryId/${deliveryman._id}`);
            return res.data || []; // Ensure this returns an array
        }
    });


    console.log(bookByDeliveryId)

    console.log(deliveryman._id)






    return (
        <div className='w-8/12 flex flex-col w-full relative'>
            <div className="text-center">
                <h1 className="text-5xl font-bold">My Delivery List {bookByDeliveryId.length}</h1>
            </div>

            <div className="overflow-x-auto py-7 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booked User’s Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Request Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Receivers phone number</th>
                            <th>Receivers Address</th>
                            <th>View Location</th>
                            <th>Cancel</th>
                            <th>Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookByDeliveryId.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.receiverName}</td>
                                <td>{item.phone}</td>
                                <td>{item.requestedDeliveryDate}</td>
                                <td>{item.approximateDate}</td>
                                <td>{item.receiverPhoneNumber}</td>
                                <td>{item.parcelDeliveryAddress}</td>
                                <td>
                                    <button
                                    className="btn btn-success btn-sm">
                                        view location
                                    </button>
                                </td>
                                <td>
                                    <button
                                    className="btn btn-success btn-sm">
                                        cancel
                                    </button>
                                </td>
                                <td>
                                    <button
                                    className="btn btn-success btn-sm">
                                        Deliver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                
        </div>
    );
};

export default MyDeliveryList;