import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { FaBicycle } from 'react-icons/fa';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const UpdateItems = () => {

const {  phone, _id, parcelType,  receiverName, receiverPhoneNumber, parcelDeliveryAddress, requestedDeliveryDate, deliveryAddressLatitude, deliveryAddresslongitude } = useLoaderData();

// console.log(phone, _id, status)

    const { user } = useContext(AuthContext);
    const currentDate = new Date().toLocaleDateString();
    const { register, handleSubmit, reset, watch,setValue } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();



   // Watch the parcel weight to calculate price
//    const parcelWeight = watch('parcelWeight', 0);
//    const price = calculatePrice(parcelWeight);


    const parcelWeight = watch('parcelWeight', 0);
   
    useEffect(() => {
        const price = calculatePrice(parcelWeight);
        setValue('price', price); // Update the price field in the form
    }, [parcelWeight, setValue]);

   function calculatePrice(weight) {
       if (weight <= 1) return 50;
       if (weight>1 && weight<= 2) return 100;
       return 150;
   }


     const onSubmit = async (data) => {
   
           console.log(data)
   
   
   
           const bookItem = {
               name: data.name,
               email: data.email,
               price: parseFloat(data.price),
               phone: data.phone,
               parcelType: data.parcelType,
               parcelWeight: data.parcelWeight,
               receiverName: data.receiverName,
               receiverPhoneNumber: data.receiverPhoneNumber,
               parcelDeliveryAddress: data.parcelDeliveryAddress,
               requestedDeliveryDate: data.requestedDeliveryDate,
               deliveryAddressLatitude: data.deliveryAddressLatitude,
               deliveryAddresslongitude: data.deliveryAddresslongitude,
              
           }
   
           const bookRes = await axiosSecure.put(`/book/${_id}`, bookItem);
           console.log(bookRes.data)
           if(bookRes.data.modifiedCount > 0){
            // show success popup
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is updated to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
   
       }
   


    return (
        <div>
            <div className="text-center">
                <h1 className="text-5xl font-bold">Update Parcel</h1>

            </div>

            <form  onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-2'>
                {/* name */}
                <div className="form-control w-full my-1">

                    <label className="label">
                        <span className="label-text">Name</span>
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

                {/* email */}
                <div className="form-control w-full my-1">

                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    {

                        user && user?.email ? (

                            <input
                                readOnly
                                defaultValue={user.email}
                                type="text"
                                placeholder="Email"
                                {...register('email', { required: true })}

                                className="input input-bordered w-full" />

                        ) : (
                            <input
                                readOnly
                                type="text"
                                placeholder="Email (read-only)"
                                {...register('email', { required: true })}

                                className="input input-bordered w-full" />

                        )
                    }


                </div>

                {/* phone */}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        defaultValue={phone}
                        placeholder="Phone Number"
                        {...register('phone', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Parcel Type*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Parcel Type</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={parcelType}
                        placeholder="Parcel Type"
                        {...register('parcelType', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                      {/* Parcel Weight*/}

                      <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Parcel Weight</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={parcelWeight}
                        placeholder="Parcel Weight"
                        {...register('parcelWeight', { required: true })}
                        className="input input-bordered w-full" />
                </div>


                {/* Receiver’s Name*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Receiver’s Name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={receiverName}
                        placeholder="Receiver’s Name"
                        {...register('receiverName', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Receiver's Phone Number */}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Receiver's Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        defaultValue={receiverPhoneNumber}
                        placeholder="Receiver's Phone Number"
                        {...register('receiverPhoneNumber', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Parcel Delivery Address*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Parcel Delivery Address</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={parcelDeliveryAddress}
                        placeholder="Parcel Delivery Address"
                        {...register('parcelDeliveryAddress', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Requested Delivery Date*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Requested Delivery Date</span>
                    </label>
                    <input
                        type="date"
                        defaultValue={requestedDeliveryDate}
                        placeholder="Requested Delivery Date"
                        {...register('requestedDeliveryDate', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Delivery Address Latitude*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Delivery Address Latitude</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={deliveryAddressLatitude}
                        placeholder="Delivery Address Latitude"
                        {...register('deliveryAddressLatitude', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                {/* Delivery Address longitude*/}

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Delivery Address longitude</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={deliveryAddresslongitude}
                        placeholder="Delivery Address longitude"
                        {...register('deliveryAddresslongitude', { required: true })}
                        className="input input-bordered w-full" />
                </div>


                {/* price */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Price*</span>
                    </label>


                    <input
                        type="number"
                        value={watch('price')}
                        readOnly
                        placeholder="Price"
                        {...register('price', { required: true })}
                        className="input input-bordered w-full" />
                </div>

                <button className="btn btn-success col-span-2">
                    Update <FaBicycle className="ml-4"></FaBicycle>
                </button>
            </form>
        </div>
    );
};

export default UpdateItems;