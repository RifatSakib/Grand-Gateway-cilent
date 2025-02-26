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
        queryKey: ['tutor',user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book/email/${user.email}`);

            return res.data;
        }
    })

    console.log(user)

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
        <div className=' w-8/12 flex flex-col'>
            <div className="text-center">
                <h1 className="text-5xl font-bold">My Parcel</h1>

            </div>


            <div className="overflow-x-auto py-7  mx-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            book.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>


                                <td>
                                    {item?.parcelType}
                                </td>
                                <td>
                                    {item?.requestedDeliveryDate}
                                </td>
                                <td>
                                    {item?.approximateDate}
                                </td>
                                <td>
                                    {currentDate}
                                </td>
                                <td>
                                    {item?.deliveryMan_Id}

                                </td>

                                <td>
                                    {item?.status}
                                </td>


                                <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button
                                            className="btn btn-ghost btn-sm bg-yellow-500">
                                            Update
                                        </button>
                                    </Link>
                                </td>


                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-error btn-sm ">
                                        Cancel
                                    </button>
                                </td>


                                <td>
                                    <button

                                        onClick={() => handleReview(item)}
                                        className="btn btn-error btn-sm">
                                        review
                                    </button>
                                </td>

                                <td>
                                    <button

                                        className="btn btn-error btn-sm">
                                        pay
                                    </button>
                                </td>




                            </tr>)
                        }
                    </tbody>


                </table>
            </div>


            {/* Modal */}
            {isOpen && selectedItem && (
                <dialog className="modal absolute" open>
                    <div className="modal-box">
                        <h3 className='text-center text-xl font-bold'>Review</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Select Delivery Man */}

                            <div className="form-control w-full my-1">

                                <label className="label">
                                    <span className="label-text">User's Name</span>
                                </label>

                                {

                                    user && user?.displayName ? (

                                        <input
                                            readOnly
                                            defaultValue={user.displayName}
                                            type="text"
                                            placeholder="Name"
                                            {...register('name', { required: true })}

                                            className="input input-bordered w-full" />

                                    ) : (
                                        <input
                                            readOnly
                                            type="text"
                                            placeholder="Name (read-only)"
                                            {...register('name', { required: true })}

                                            className="input input-bordered w-full" />

                                    )
                                }


                            </div>


                            <div className="form-control w-full my-1">

                                <label className="label">
                                    <span className="label-text">User's Image</span>
                                </label>
                                <input
                                    readOnly
                                    defaultValue={user.photoURL}
                                    type="text"
                                    placeholder="photoURL"
                                    {...register('photoURL', { required: true })}

                                    className="input input-bordered w-full" />



                            </div>

                            <div className="form-control w-full my-1">

                                <label className="label">
                                    <span className="label-text">Ratings</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Rate me Out Of 5"
                                    {...register('ratings', { required: true })}
                                    className="input input-bordered w-full"
                                    step="0.1" // for fractional values
                                    min="0"
                                    max="5"
                                />

                            </div>

                            <div className="form-control w-full my-1">

                                <label className="label">
                                    <span className="label-text">FeedBack</span>
                                </label>
                                <textarea
                                    style={{ height: "100px", width: "300px" }}

                                    type="text"
                                    placeholder="FeedBack Text"
                                    {...register('feedBack', { required: true })}
                                    className="input input-bordered w-full" />

                            </div>


                            <div className="form-control w-full my-1">

                                <label className="label">
                                    <span className="label-text">Delivery Men’s ID</span>
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    defaultValue={selectedItem?.deliveryMan_Id}
                                    placeholder="Rate me Out Of 5"
                                    {...register('deliveryManID', { required: true })}
                                    className="input input-bordered w-full" />

                            </div>


                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}



        </div>
    );
};

export default MyParcels;