import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import MyLocation from './MyLocation';

const MyDeliveryList = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    const handleManageLocation = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const { data: deliveryman = {} } = useQuery({
        queryKey: [user?.email, 'deliveryman'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/oneDeliveryman/${user.email}`);
            return res.data.user || {};
        }
    });

    const { data: bookByDeliveryId = [], refetch } = useQuery({
        queryKey: [deliveryman?._id, 'bookByDeliveryId'],
        enabled: !!deliveryman?._id,
        queryFn: async () => {
            if (!deliveryman?._id) return [];
            const res = await axiosSecure.get(`/book/AllBookByDeliveryId/${deliveryman._id}`);
            return res.data || [];
        }
    });

    const handleCancel = async (item) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/book/cancel/${item._id}`);
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order Cancelled",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (err) {
                toast.error(err.response?.data || "An error occurred");
            }
        }
    };

    const handleDeliver = async (item) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Confirm delivery?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deliver it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/book/deliver/${item._id}`);
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order Delivered",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (err) {
                toast.error(err.response?.data || "An error occurred");
            }
        }
    };

    return (
        <div className="w-full px-4 md:px-10 lg:px-16">
            <div className="text-center py-6">
                <h1 className="text-3xl md:text-4xl font-bold">My Delivery List ({bookByDeliveryId.length})</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto min-w-full border-collapse border border-gray-200 shadow-md text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">User Name</th>
                            <th className="p-2 border">Receiver</th>
                            <th className="p-2 border hidden md:table-cell">User Phone</th>
                            <th className="p-2 border">Request Date</th>
                            <th className="p-2 border">Approx. Date</th>
                            <th className="p-2 border hidden lg:table-cell">Receiver Phone</th>
                            <th className="p-2 border hidden lg:table-cell">Address</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookByDeliveryId.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border">{item.receiverName}</td>
                                <td className="p-2 border hidden md:table-cell">{item.phone}</td>
                                <td className="p-2 border">{item.requestedDeliveryDate}</td>
                                <td className="p-2 border">{item.approximateDate}</td>
                                <td className="p-2 border hidden lg:table-cell">{item.receiverPhoneNumber}</td>
                                <td className="p-2 border hidden lg:table-cell">{item.parcelDeliveryAddress}</td>
                                <td className="p-2 border">
                                    <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-2 justify-center">
                                        <button
                                            onClick={() => handleManageLocation(item)}
                                            className="btn btn-outline btn-xs md:btn-sm whitespace-nowrap"
                                        >
                                            View Location
                                        </button>
                                        <button
                                            onClick={() => handleCancel(item)}
                                            className="btn btn-error btn-xs md:btn-sm whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDeliver(item)}
                                            className="btn bg-gradient-to-b from-[#7f8b73] via-[#95a387] to-[#b9cba7] bg-opacity-20 backdrop-blur-lg shadow-lg btn-xs md:btn-sm whitespace-nowrap"
                                        >
                                            Deliver
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isOpen && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full md:w-3/4 lg:w-2/3 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-bold">Map</h3>
                            <button className="btn btn-error" onClick={closeModal}>Close</button>
                        </div>
                        <MyLocation
                            deliveryAddressLatitude={selectedItem.deliveryAddressLatitude}
                            deliveryAddresslongitude={selectedItem.deliveryAddresslongitude}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDeliveryList;
