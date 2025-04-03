import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaBicycle, FaBoxOpen, FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const BookAParcel = () => {

    const { user, logOut } = useContext(AuthContext);
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const axiosSecure = UseAxiosSecure();

console.log(currentDate)

    // // Watch the parcel weight to calculate price
    // const parcelWeight = watch('parcelWeight', 0);
    // const price = calculatePrice(parcelWeight);

    const parcelWeight = watch('parcelWeight', 0);
   
    useEffect(() => {
        const price = calculatePrice(parcelWeight);
        setValue('price', price); // Update the price field in the form
    }, [parcelWeight, setValue]);

    function calculatePrice(weight) {
        if (weight <= 1) return 50;
        if (weight > 1 && weight <= 2) return 100;
        return 150;
    }

    const onSubmit = async (data) => {

        console.log(data)



        const bookItem = {
            name: data.name,
            email: data.email,
            price: parseFloat(data.price),
            phone: data.phone,
            bookingDate: data.bookingDate,
            parcelType: data.parcelType,
            parcelWeight: data.parcelWeight,
            receiverName: data.receiverName,
            receiverPhoneNumber: data.receiverPhoneNumber,
            parcelDeliveryAddress: data.parcelDeliveryAddress,
            requestedDeliveryDate: data.requestedDeliveryDate,
            deliveryAddressLatitude: parseFloat(data.deliveryAddressLatitude),
            deliveryAddresslongitude: parseFloat(data.deliveryAddresslongitude),
            status: "pending", //default
        }

        const bookRes = await axiosSecure.post('/book', bookItem);
        console.log(bookRes.data)
        if (bookRes.data.insertedId) {
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the book list.`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div>
           
                <h1 className="text-3xl md:text-5xl font-bold text-center p-4">Add Parcel</h1>

            

            <div>
                
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
    {/* Name */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Name</span>
        </label>
        <input
            type="text"
            readOnly
            defaultValue={user?.displayName || ""}
            {...register('name', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Email */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Email</span>
        </label>
        <input
            type="text"
            readOnly
            defaultValue={user?.email || ""}
            {...register('email', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Phone */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Phone Number</span>
        </label>
        <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Booking Date */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Booking Date</span>
        </label>
        <input
            type="date"
            defaultValue={currentDate}
            readOnly
            {...register('bookingDate', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Parcel Type */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Parcel Type</span>
        </label>
        <input
            type="text"
            placeholder="Parcel Type"
            {...register('parcelType', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Parcel Weight */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Parcel Weight</span>
        </label>
        <input
            type="number"
            placeholder="Parcel Weight"
            {...register('parcelWeight', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Receiver's Name */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Receiver’s Name</span>
        </label>
        <input
            type="text"
            placeholder="Receiver’s Name"
            {...register('receiverName', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Receiver's Phone Number */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Receiver's Phone Number</span>
        </label>
        <input
            type="tel"
            placeholder="Receiver's Phone Number"
            {...register('receiverPhoneNumber', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Parcel Delivery Address */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Parcel Delivery Address</span>
        </label>
        <input
            type="text"
            placeholder="Parcel Delivery Address"
            {...register('parcelDeliveryAddress', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Requested Delivery Date */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Requested Delivery Date</span>
        </label>
        <input
            type="date"
            {...register('requestedDeliveryDate', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Delivery Address Latitude */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Delivery Address Latitude</span>
        </label>
        <input
            type="number"
            step="any"
            placeholder="Delivery Address Latitude"
            {...register('deliveryAddressLatitude', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Delivery Address Longitude */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Delivery Address Longitude</span>
        </label>
        <input
            type="number"
            step="any"
            placeholder="Delivery Address Longitude"
            {...register('deliveryAddresslongitude', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

    {/* Price */}
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Price</span>
        </label>
        <input
            type="number"
            value={watch('price')}
            readOnly
            {...register('price', { required: true })}
            className="input input-bordered w-full"
        />
    </div>

<br />
    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2 flex justify-center">
        <button className="btn bg-gradient-to-b from-[#7f8b73] via-[#95a387] to-[#b9cba7] bg-opacity-20 backdrop-blur-lg shadow-lg  w-full text-black ">
            Book <FaBicycle className="ml-2" />
        </button>
    </div>
</form>


            </div>

           
        </div>

    );
};

export default BookAParcel;