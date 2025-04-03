import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseItems from '../../../Hooks/UseItems';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {

    // const [book, refetch] = UseItems();
    const axiosSecure = UseAxiosSecure();
    const { user, logOut } = useContext(AuthContext);
    const currentDate = new Date().toLocaleDateString();
    const { register, handleSubmit, reset, watch, setValue, errors } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item


    const { data: book = [], isPending: loading, refetch } = useQuery({
        queryKey: ['tutor', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book/email/${user.email}`);

            return res.data;
        }
    })

    console.log(user)


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


    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null); // Reset selected item when closing the modal
    };

    console.log(book)

    const handleReview = (item) => {
        setSelectedItem(item); // Set the selected item
        setIsOpen(true); // Open the modal
        reset();
    };

    const onSubmit = async (data) => {

        const reviewItem = {
            name: data.name,
            image: data.photoURL,
            ratings: data.ratings,
            feedBack: data.feedBack,
            deliveryManID: data.deliveryManID,
            reviewDate: currentDate,
        }

        reset();

        const reviewRes = await axiosSecure.post('/review', reviewItem);
        console.log(reviewRes.data)
        if (reviewRes.data.insertedId) {
            // show success popup
            reset();
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Review added Successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        }



        // console.log(reviewItem)
        console.log(reviewRes)
    }


    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div className="px-4 md:px-10">
        <div className="text-center w-full">
            <h1 className="text-3xl md:text-5xl font-bold">My Parcel</h1>
        </div>
    
        <div className="w-full flex flex-col items-center">
            <div className="overflow-x-auto w-full max-w-6xl py-7">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th>#</th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((item, index) => (
                            <tr key={item._id} className="border-b">
                                <td>{index + 1}</td>
                                <td>{item?.parcelType}</td>
                                <td>{item?.requestedDeliveryDate}</td>
                                <td>{item?.approximateDate}</td>
                                <td>{item?.bookingDate}</td>
                                <td>{item?.deliveryMan_Id}</td>
                                <td>{item?.status}</td>
                                <td>
                                    <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-2 justify-center">
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn btn-warning btn-xs whitespace-nowrap">
                                                Update
                                            </button>
                                        </Link>
    
                                        {item?.status === "pending" ? (
                                            <button
                                                onClick={() => handleCancel(item)}
                                                className="btn btn-error btn-xs whitespace-nowrap"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-error btn-xs whitespace-nowrap"
                                                disabled
                                            >
                                                Cancel
                                            </button>
                                        )}
    
                                        {item?.status === "delivered" ? (
                                            <button
                                                onClick={() => handleReview(item)}
                                                className="btn btn-success btn-xs whitespace-nowrap bg-gradient-to-b from-[#7f8b73] via-[#95a387] to-[#b9cba7] bg-opacity-20 backdrop-blur-lg shadow-lg"
                                            >
                                                Review
                                            </button>
                                        ) : null}
    
                                        <Link to={`/dashboard/payment/${item._id}`}>
                                            <button className="btn btn-accent btn-xs whitespace-nowrap">
                                                Pay
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* Modal */}
            {isOpen && selectedItem && (
                <dialog className="modal flex items-center justify-center p-4" open>
                    <div className="modal-box max-w-lg w-full">
                        <h3 className="text-center text-xl font-bold">Review</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">User's Name</span>
                                </label>
                                <input
                                    readOnly
                                    defaultValue={user?.displayName || ""}
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
    
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">User's Image</span>
                                </label>
                                <input
                                    readOnly
                                    defaultValue={user?.photoURL || ""}
                                    type="text"
                                    {...register('photoURL', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
    
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Ratings</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Rate me Out Of 5"
                                    {...register('ratings', { required: true })}
                                    className="input input-bordered w-full"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                />
                            </div>
    
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Feedback</span>
                                </label>
                                <textarea
                                    placeholder="Write your feedback..."
                                    {...register('feedBack', { required: true })}
                                    className="input input-bordered w-full h-24"
                                />
                            </div>
    
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Delivery Men’s ID</span>
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    defaultValue={selectedItem?.deliveryMan_Id}
                                    {...register('deliveryManID', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
    
                            <button type="submit" className="btn w-full bg-gradient-to-b from-[#7f8b73] via-[#95a387] to-[#b9cba7] bg-opacity-20 backdrop-blur-lg shadow-lg">
                                Submit
                            </button>
                        </form>
    
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    </div>
    
    );
};

export default MyParcels;