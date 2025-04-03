import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth"
;


const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                }




                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        navigate('/');




                    })
            })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn bg-gradient-to-b from-[#7f8b73] via-[#95a387] to-[#b9cba7] bg-opacity-20 backdrop-blur-lg shadow-lg  w-full text-black">
                    <FaGoogle className="mr-2 "></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;