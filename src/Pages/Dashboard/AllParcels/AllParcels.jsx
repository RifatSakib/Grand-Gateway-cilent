import React, { useState } from 'react';
import UseItems from '../../../Hooks/UseItems';
import { FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const AllParcels = () => {
    const axiosSecure = UseAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item

    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null); // Reset selected item when closing the modal
    };

    const { data: book = [] } = useQuery({
        queryKey: ['book'],
        queryFn: async () => {
            const res = await axiosSecure.get('/book/all');
            return res.data;
        }
    });

    const { data: deliverman = [] } = useQuery({
        queryKey: ['deliverman'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverymen');
            return res.data;
        }
    });

    const handleManageClick = (item) => {
        setSelectedItem(item); // Set the selected item
        setIsOpen(true); // Open the modal
    };

    return (
        <div className='w-8/12 flex flex-col w-full'>
            <div className="text-center">
                <h1 className="text-5xl font-bold">My Parcel {book.length}</h1>
            </div>

            <div className="overflow-x-auto py-7 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Phone</th>
                            <th>Booking Date</th>
                            <th>Request Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.receiverPhoneNumber}</td>
                                <td>{item.bookingDate}</td>
                                <td>{item.requestedDeliveryDate}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleManageClick(item)} // Pass the item to the handler
                                        className="btn btn-success btn-sm">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isOpen && selectedItem && (
                <dialog className="modal over" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                        <h3 className="font-bold text-lg">{selectedItem.email}</h3>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AllParcels;