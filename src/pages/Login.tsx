import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice";
import React from "react";

const Login: React.FC = () => {
    const dispatch: any = useDispatch()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLogindata] = useState({
        email: '',
        password: "",
    });

    function handleUserInput(e: any) {
        const { name, value } = e.target
        setLogindata({
            ...loginData, [name]: value
        })
    }
    async function createNewAccount(e: any) {
        e.preventDefault();
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            setIsLoading(false);
            return;
        }
        const response = await dispatch(login(loginData));
        if (response?.payload?.success)
            navigate("/");
        setIsLoading(false)
        setLogindata({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[90vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>




                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="email"
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleUserInput}
                            placeholder="Enter your email.."
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <span><Link to='/forgot-password' className="link text-accent">Forget password</Link> </span>
                        </div>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleUserInput}
                            placeholder="Enter your password.."
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'loggedin...' : 'Login'}
                    </button>
                    <p className="text-center">
                        Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
};

export default Login;
