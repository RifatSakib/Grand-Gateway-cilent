import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';
import Lottie from "lottie-react";
import login from "../../assets/lottie/login.json";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        signIn(email, password)
            .then((result) => {
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
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid email or password!',
                    text: error.message,
                    showConfirmButton: true,
                });
            });
    };

    const handleDemoLogin = (userType) => {
        if (userType === 'admin') {
            setEmail('admin@gmail.com');
            setPassword('abcdE1!');
        } else if (userType === 'delivery') {
            setEmail('deliveryman@gmail.com');
            setPassword('abcdE1!');
        }
        setTimeout(() => {
            document.getElementById('login-form').requestSubmit();
        }, 500);
    };

    return (
        <>
            <Helmet>
                <title>Grand-Gateway | Log In</title>
            </Helmet>

            {loading ? (
                <div className="flex flex-col min-h-screen w-full justify-center items-center text-lg md:text-5xl">
                    <span className="loading loading-bars loading-xl"></span>
                    <br /> <span>Please Wait...</span>
                </div>
            ) : (
                <div className="hero min-h-screen bg-base-200 md:pt-40">
                    <div className="hero-content flex-col md:flex-row-reverse">
                        <div className="text-center w-1/2 lg:text-left">
                            <Lottie animationData={login}></Lottie>
                        </div>
                        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form id="login-form" onSubmit={handleLogin} className="card-body">
                                <h1 className="text-2xl md:text-5xl font-bold text-[#7F8B73] text-center">--Login--</h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover text-red-600">Forgot password?</a>
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-outline rounded-full font-bold " type="submit" value="Login" />
                                </div>

                                {/* Demo Admin Login */}
                                <div className="form-control mt-2">
                                    <button type="button" className="btn btn-outline rounded-full font-bold" onClick={() => handleDemoLogin('admin')}>
                                        Demo Admin Login
                                    </button>
                                </div>

                                {/* Demo Deliveryman Login */}
                                <div className="form-control mt-2">
                                    <button type="button" className="btn btn-outline rounded-full font-bold" onClick={() => handleDemoLogin('delivery')}>
                                        Demo Deliveryman Login
                                    </button>
                                </div>
                            </form>
                            <p className='px-6 '><small>New Here? <Link to="/signup"><span className='text-[#7F8B73] text-sm font-bold'>Create an account</span></Link></small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
