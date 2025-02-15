import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import UseDeliveryman from '../../../Hooks/UseDeliveryman';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyDeliveryList = () => {

    //   const { user, logOut } = useContext(AuthContext);

    //   const [isDeliveryman] = UseDeliveryman();

    //   console.log(isDeliveryman)

    // const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item



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


    const { data: bookByDeliveryId = [], isLoading: isBooksLoading,refetch } = useQuery({
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

    // console.log(deliveryman._id)




    const handleCancel = async (item) => {
        console.log(item._id)


        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        });
    
        // Check if the user confirmed the action
        if (result.isConfirmed) {
            try {
                // Update order status
                await axiosSecure.patch(`/book/cancel/${item._id}`);
                
                // Call refetch to refresh UI (fetch orders data again)
                refetch(); // Ensure refetch is defined in the scope
    
                // Show success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Properties Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data || "An error occurred");
            }
        }

        

    }




    const handleDeliver = async (item) => {
        console.log(item._id)


        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deliver it!"
        });
    
        // Check if the user confirmed the action
        if (result.isConfirmed) {
            try {
                // Update order status
                await axiosSecure.patch(`/book/deliver/${item._id}`);
                
                // Call refetch to refresh UI (fetch orders data again)
                refetch(); // Ensure refetch is defined in the scope
    
                // Show success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Properties Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data || "An error occurred");
            }
        }
        

    }




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
                            <th>status</th>
                            <th>View Location</th>
                            <th>Cancel</th>
                            <th>Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookByDeliveryId.map((item, index) => (
                            <tr key={item._id} >
                               
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.receiverName}</td>
                                <td>{item.phone}</td>
                                <td>{item.requestedDeliveryDate}</td>
                                <td>{item.approximateDate}</td>
                                <td>{item.receiverPhoneNumber}</td>
                                <td>{item.parcelDeliveryAddress}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-sm">
                                        view location
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleCancel(item)
                                           
                                        }}
                                        className="btn btn-error btn-sm">
                                        cancel
                                    </button>
                                </td>
                                <td>
                                    <button
                                     onClick={() => {
                                        handleDeliver(item)
                                       
                                    }}
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