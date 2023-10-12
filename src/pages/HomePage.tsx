import { Link } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePageImage from '../assets/Images/homePageMainImage.png';
import { useSelector } from "react-redux";
import React from "react";

const HomePage: React.FC = () => {
    const data = useSelector((state: any) => state.auth);
    console.log(data);

    return (
        <HomeLayout>
            <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center gap-10 mx-4 lg:mx-16 h-[90vh]">
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-5xl lg:text-6xl font-semibold">
                        Find the best <span className="text-yellow-500 font-bold">Online courses</span>
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    <div className="space-y-6  lg:space-y-0 lg:flex lg:justify-center">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-6 me-5 lg:px-8 py-4 lg:py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-6 lg:px-8 py-4 lg:py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img src={HomePageImage} alt="homepage image" className="w-full max-w-lg lg:max-w-full" />
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;
