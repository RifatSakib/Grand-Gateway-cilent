import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Lottie from 'lottie-react';
import signup from "../../assets/lottie/signup.json"
const SignUp = () => {
    const axiosPublic = UseAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // console.log(user)
    const onSubmit = async (data) => {
        setLoading(true); // Start loading
    
        try {
            // Upload Image
            const imageFile = new FormData();
            imageFile.append("image", data.photoURL[0]);
    
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (!res.data.success) {
                throw new Error("Image upload failed");
            }
    
            const imgUrl = res.data.data.url;
            console.log("Image URL:", imgUrl);
    
            // Create User in Firebase
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log("New User:", loggedUser);
    
            // Update User Profile
            await updateUserProfile(data.name, imgUrl);
    
            // Create User Entry in Database
            const userInfo = {
                name: data.name,
                email: data.email,
                image: imgUrl, // Use the uploaded image URL
                phone: data.phone,
            };
    
            // Add role if it's a deliveryman
            if (data.role === "deliveryman") {
                userInfo.role = "deliveryman";
            }
    
            const dbRes = await axiosPublic.post("/users", userInfo);
            if (dbRes.data.insertedId) {
                console.log("User added to the database");
                reset();
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
    
                navigate("/");
                navigate(0); // Refresh page
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setLoading(false); // Stop loading
    
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Signup failed!",
                text: error.message,
                showConfirmButton: true,
            });
        }
    };
    

    return (
        <>
            <Helmet>
                <title>Grand-Gateway | Sign Up</title>
            </Helmet>


            {loading ? (

                <div className="l flex flex-col min-h-screen w-full justify-center items-center text-lg md:text-5xl "> <span className="loading loading-bars loading-xl  "></span>
                    <br /> <span>Please Wait...</span></div>


            ) : (


                <div className="hero min-h-screen bg-base-200  md:pt-40">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center w-1/2 md:w-5/12 lg:text-left">
                            <Lottie animationData={signup}></Lottie>

                        </div>

                        
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h1 className="text-2xl md:text-5xl font-bold text-[#7F8B73] text-center">--Sign Up--</h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>

                                {/* role */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Role</span>
                                    </label>
                                    <select
                                        {...register("role", { required: true })}
                                        name="role"
                                        className="select select-bordered"
                                    >
                                        <option value="user"> User</option>
                                        <option value="deliveryman">Deliveryman</option>
                                    </select>
                                    {errors.role && <span className="text-red-600">Role is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Profile Image</span>
                                    </label>
                                    <input type="file"  {...register("photoURL", { required: true })} placeholder="Profile Image" className="file-input w-full max-w-xs" />

                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input type="tel"  {...register("phone", { required: true })} name="phone" placeholder="Phone Number" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Phone Number is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover text-red-600">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-outline rounded-full font-bold" type="submit" value="Sign Up" />
                                </div>
                            </form>
                            <p className="px-6"><small>Already have an account? <Link to="/login"><span className="text-[#7F8B73] text-sm font-bold">Login</span></Link></small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>


            )}





        </>
    );
};

export default SignUp;