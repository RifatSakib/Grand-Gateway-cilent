import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';

const MyProfile = () => {

     const { register, handleSubmit } = useForm();
    
        const { user, logOut } = useContext(AuthContext);
    

    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-bold">MY Profile</h1>

            </div>


            <form >
                <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col lg:flex-row-reverse w-full">
                        <div className='w-full'>
                            <img
                                src={user?.photoURL}
                                className="max-w-sm rounded-lg shadow-2xl" />


                            <div className="form-control w-full my-6">
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>

                            <button className="btn btn-primary">Update</button>

                        </div>

                        <div className='w-full'>
                            <h1 className="text-xl font-bold ">Name:</h1>
                            <p className="">
                                {user?.displayName}
                            </p>

                            <h1 className="text-xl font-bold ">Email:</h1>
                            <p className="">
                                {user?.email}
                            </p>

                            <h1 className="text-xl font-bold ">last SignIn Time:</h1>
                            <p className="">
                                {user?.metadata.lastSignInTime}
                            </p>



                            <h1 className="text-xl font-bold ">Creation Time:</h1>
                            <p className="">
                                {user?.metadata.creationTime}
                            </p>

                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MyProfile;