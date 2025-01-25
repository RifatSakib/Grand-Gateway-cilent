import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyParcels = () => {


    const { user, logOut } = useContext(AuthContext);
    
        const currentDate = new Date().toLocaleDateString();
    

    return (
        <div className='lg:w-3/4 mx-auto py-7'>
        <div className="text-center">
            <h1 className="text-5xl font-bold">Add Parcel</h1>

        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <form className="card-body">


                {/* form first row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input type="text" name='parcelType' placeholder="Parcel Type" className="input input-bordered" required />
                    </div>

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input type="date" name='requestedDeliveryDate' placeholder="Requested Delivery Date" className="input input-bordered" required />
                    </div>
                </div>


                {/* form second row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Approximate Delivery Date</span>
                        </label>
                        <input type="date" name='approximateDeliveryDate' placeholder="Approximate Delivery Date" className="input input-bordered" required />
                    </div>

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Booking Date</span>
                        </label>
                        <input value={currentDate} type="text" name='bookingDate' placeholder="Booking Date" className="input input-bordered" required />
                    </div>
                </div>


                {/* form third row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Delivery Men ID</span>
                        </label>
                        <input type="text" name='deliveryMenID' placeholder="Delivery Men ID" className="input input-bordered" />
                    </div>

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Booking Status</span>
                        </label>
                        <input type="text" name='bookingStatus' placeholder="Booking Status" className="input input-bordered" required />
                    </div>
                </div>



                <div className="form-control mt-6 col-span-2">
                        <button className="btn btn-primary">Add Equipment</button>
                    </div>




            </form>

            
            <div className='grid grid-cols-2 gap-2 px-7 py-2 mt-0 '>
                    <div className="form-control ">
                        <button className="btn btn-primary">Update</button>
                    </div>
                    <div className="form-control ">
                        <button className="btn btn-primary">Cancel</button>
                    </div>
                    <div className="form-control ">
                        <button className="btn btn-primary">Review</button>
                    </div>
                    <div className="form-control ">
                        <button className="btn btn-primary">Pay</button>
                    </div>
                                        </div>
        </div>
    </div>
    );
};

export default MyParcels;