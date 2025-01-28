import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {



    const { register, handleSubmit } = useForm();

    const { user, logOut } = useContext(AuthContext);

    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })




    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        console.log(res.data)

        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const UpdateImage = {
             
                image: res.data.data.display_url
            }
            // 
            const imgRes = await axiosSecure.patch(`/users/${users._id}`, UpdateImage);
            console.log(imgRes.data)
            if (imgRes.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `image is updated to the profile.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-bold">MY Profile</h1>

            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
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