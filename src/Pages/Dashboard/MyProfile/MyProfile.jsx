import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // Fetch the logged-in user's details
    const { data: userData, refetch } = useQuery({
        queryKey: ['user', user?.email], // Use a unique queryKey
        queryFn: async () => {
            if (!user?.email) return null; // Prevents API call if user is undefined
            const res = await axiosPublic.get(`/users/email/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensures it only runs when user.email exists
    });

    console.log(userData); // Debugging: Log user data

    const onSubmit = async (data) => {
        if (!userData?._id) {
            console.error("User data not found");
            return;
        }

        // Upload image to imgbb
        const imageFile = { image: data.image[0] };
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            if (!res.data.success) {
                console.error("Image upload failed", res.data);
                return;
            }

            const imgUrl = res.data.data.url;

            // Update user's image in the database
            const imgRes = await axiosSecure.patch(`/users/imgUpload/${userData._id}`, { image: imgUrl });

            if (imgRes.data.modifiedCount > 0) {
                // Refresh the data to reflect changes
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Profile image updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error("Failed to update image in DB");
            }
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-bold">MY Profile</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse w-full">
                        {/* Profile Image & Upload */}
                        <div className='w-full'>
                            <img
                                src={userData?.image || user?.photoURL} // Show updated image if available
                                className="max-w-sm rounded-lg shadow-2xl"
                                alt="Profile"
                            />
                            <div className="form-control w-full my-6">
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>
                            <button className="btn btn-primary">Update</button>
                        </div>

                        {/* User Info */}
                        <div className='w-full'>
                            <h1 className="text-xl font-bold ">Name:</h1>
                            <p>{user?.displayName}</p>

                            <h1 className="text-xl font-bold ">Email:</h1>
                            <p>{user?.email}</p>

                            <h1 className="text-xl font-bold ">Last Sign-In Time:</h1>
                            <p>{user?.metadata?.lastSignInTime}</p>

                            <h1 className="text-xl font-bold ">Account Created On:</h1>
                            <p>{user?.metadata?.creationTime}</p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MyProfile;
