import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/AuthSlice";
import React from "react"
const Signup: React.FC = () => {
    const dispatch: any = useDispatch()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<any>("");
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: "",
        avatar: ""
    });

    function handleUserInput(e: any) {
        const { name, value } = e.target
        setSignupData({
            ...signupData, [name]: value
        })
    }

    function getImage(event: any) {
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(e: any) {
        e.preventDefault();
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            setIsLoading(false);
            return;
        }

        if (signupData.fullName.length < 3) {
            toast.error("Name should be at least 3 characters long")
            setIsLoading(false);
            return;
        }
        if (!signupData.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
            toast.error("Invalid email id");
            setIsLoading(false);
            return;
        }
        if (!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error("Password should be 6 - 16 characters long with at least one number and one special character");
            setIsLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success)
            navigate("/");
        setIsLoading(false)
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[90vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img
                                className="w-24 h-24 rounded-full m-auto"
                                src={previewImage}
                                alt="previewImage"
                            />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        type="file"
                        className="hidden"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className='font-semibold'>Name</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={signupData.fullName}
                            onChange={handleUserInput}
                            placeholder="Enter your name.."
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="email"
                            id="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleUserInput}
                            placeholder="Enter your email.."
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="password"
                            id="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleUserInput}
                            placeholder="Enter your password.."
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
};

export default Signup;
