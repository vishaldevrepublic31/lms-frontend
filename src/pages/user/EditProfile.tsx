import { getUserData, updateProfile } from "../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayout from "../../layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import React from "react";
import { AnyAction } from "@reduxjs/toolkit";

const EditProfile: React.FC = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [data, setData] = useState<any>({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state: any) => state?.auth?.data?._id)
    });

    function handleImageUpload(e: any) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e: any) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e: any) {
        e.preventDefault();
        console.log(data);
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        console.log(formData.entries().next())
        console.log(formData.entries().next())
        await dispatch(updateProfile(formData));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {data.previewImage ? (
                            <img
                                className="w-28 h-28 rounded-full m-auto"
                                src={data.previewImage}

                            />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .svg, .jpeg"

                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border"
                            value={data.fullName}
                            onChange={handleInputChange}

                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Update profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile
