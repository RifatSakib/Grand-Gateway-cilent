import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';
import Lottie from "lottie-react";
import login from "../../assets/lottie/login.json"
const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)



    const handleLogin = event => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoading(false);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login successfully.',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(from, { replace: true });
            })

            .catch((error) => {
                setLoading(false); // Stop loading
    
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid email or password!',
                    text: error.message,
                    showConfirmButton: true,
                });
            });
    };
    



    return (
        <>
            <Helmet>
                <title>Grand-Gateway | Log In</title>
            </Helmet>

            {loading ? (

                <div className="l flex flex-col min-h-screen w-full justify-center items-center text-lg md:text-5xl "> <span className="loading loading-bars loading-xl  "></span>
                    <br /> <span>Please Wait...</span></div>


            ) : (


                <div className="hero min-h-screen bg-base-200 md:pt-40">
                    <div className="hero-content flex-col md:flex-row-reverse">
                        <div className="text-center w-1/2 lg:text-left">

                            <Lottie animationData={login}></Lottie>

                        </div>
                        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="card-body">
                                <h1 className="text-2xl md:text-5xl font-bold">Login now!</h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    {/* TODO: apply disabled for re captcha */}
                                    <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                                </div>
                            </form>
                            <p className='px-6'><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};

export default Login;