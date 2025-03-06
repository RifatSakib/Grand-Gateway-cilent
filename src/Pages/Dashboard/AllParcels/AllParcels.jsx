import React, { useState } from 'react';
import UseItems from '../../../Hooks/UseItems';
import { FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const AllParcels = () => {
    const axiosSecure = UseAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item
    const [bookID, setBookID] = useState(null);
    const { register, handleSubmit, reset, watch, setValue, errors } = useForm();



    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null); // Reset selected item when closing the modal
    };

    const { data: book = [], refetch } = useQuery({
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

    console.log(book._id)

    const handleManageClick = (item) => {
        setSelectedItem(item); // Set the selected item
        setIsOpen(true); // Open the modal
    };






    const onSubmit = async (data) => {

        console.log(data.deliveryMan); // Handle form submission
        console.log(data.approximateDate); // Handle form submission
        console.log(typeof(bookID));



        // const status = 'In Progress'
        try {
            // update order status
            await axiosSecure.patch(`/book/${bookID}`, {
                
                deliveryMan_Id : data.deliveryMan,
                approximateDate : data.approximateDate,

            })
            // call refetch to refresh ui(fetch orders data again)
            refetch()
            
            Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `Proterties Updated`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });


        } catch (err) {
            console.log(err)
            toast.error(err.response.data)
        }

        reset();
    };

    return (
        <div className='w-8/12 flex flex-col w-full relative'>
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
                                        onClick={() => {
                                            handleManageClick(item);
                                            setBookID(item._id);
                                        }} // Pass the item to the handler

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
    <dialog className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" open>
        <div className="modal-box max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">{selectedItem.name}</h3>
            <h3 className="font-bold text-lg">{selectedItem.email}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Select Delivery Man */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Pick Delivery Man</span>
                    </label>
                    <select
                        {...register('deliveryMan', { required: true })}
                        className="p-2 border border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 bg-white"
                    >
                        <option value="" disabled selected>Pick Delivery Man</option>
                        {deliverman.map((dItem) => (
                            <option value={dItem._id} key={dItem._id}>
                                {dItem.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Approximate Date */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Approximate Date</span>
                    </label>
                    <input
                        type="date"
                        {...register('approximateDate', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>

            <div className="modal-action flex justify-end mt-4">
                <button className="btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    </dialog>
)}

        </div>
    );
};

export default AllParcels;