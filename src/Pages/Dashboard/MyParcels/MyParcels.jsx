import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseItems from '../../../Hooks/UseItems';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const MyParcels = () => {

    const [book, refetch] = UseItems();
    const axiosSecure = UseAxiosSecure();

    const { user, logOut } = useContext(AuthContext);

    const currentDate = new Date().toLocaleDateString();

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


                                    {/* <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.name} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td> */}


                                    <td>
                                        {item.parcelType}
                                    </td>
                                    <td>
                                        {item.requestedDeliveryDate}
                                    </td>
                                    <td>
                                        {item.approximateDeliveryDate}
                                    </td>
                                    <td>
                                        {currentDate}
                                    </td>
                                    <td>
                                        { }
                                    </td>

                                    <td>
                                        {item.status}
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


            


            
        </div>
    );
};

export default MyParcels;