import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";


const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        // googleSignIn()
        // .then(result =>{
        //     console.log(result.user);
        //     const userInfo = {
        //         email: result.user?.email,
        //         name: result.user?.displayName
        //     }
        //     axiosPublic.post('/users', userInfo)
        //     .then(res =>{
        //         console.log(res.data);
        //         navigate('/');
        //     })
        // })


        googleSignIn()
        .then((result) => {
            const user = result.user;
            console.log(result.user);
            Swal.fire({
                title: "Good job!",
                text: "Login Successful!",
                icon: "success"
            }); setUser(user);
            navigate("/"); //login korar por readmore er page a niye zabe.
        })
        .catch(err => {
            // setError({ ...error, login: err.code });
            console.log(err);
        });

    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;