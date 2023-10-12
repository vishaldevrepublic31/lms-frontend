import HomeLayout from "../layout/HomeLayout";
import aboutMainImage from '../assets/Images/aboutMainImage.png';
import apj from '../assets/Images/apj.png';
import billGates from '../assets/Images/billGates.png';
import einstein from '../assets/Images/einstein.png';
import nelsonMandela from '../assets/Images/nelsonMandela.png';
import steveJobs from '../assets/Images/steveJobs.png';
import React from "react";

const AboutUs: React.FC = () => {
    return (
        <HomeLayout>
            <div className="pl-5 md:pl-20 pt-10 flex flex-col text-white justify-center items-center">
                <div className="flex flex-col md:flex-row items-center gap-5 md:mx-10 md:ml-20">
                    <section className="w-full md:w-1/2 space-y-5 md:space-y-10">
                        <h1 className="text-3xl md:text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-md md:text-lg text-gray-200">
                            Our goal is to provide affordable and quality education to the
                            world. We are providing the platform for aspiring teachers and
                            students to share their creativity, skills, and knowledge to empower and contribute to the growth and wellness of mankind.
                        </p>
                    </section>

                    <div className="w-full md:w-1/2">
                        <img
                            id="test1"
                            className="w-full md:w-3/4 lg:w-1/2 drop-shadow-2xl"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
                            }}
                            src={aboutMainImage}
                            alt="aboutMainImage"
                        />
                    </div>
                </div>

                <div className="carousel m-auto w-full md:w-1/2 my-16">
                    {/* Your carousel code here (make it responsive using custom CSS or a responsive carousel library) */}
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                className="w-40 rounded-full border-2 border-gray-400"
                                src={nelsonMandela}
                                alt="Nelson Mandela"
                            />
                            <p className="text-xl text-gray-200">
                                "Education is the most powerful tool you can use to change the
                                world."
                            </p>
                            <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide5" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide2" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                className="w-40 rounded-full border-2 border-gray-400"
                                src={apj}
                                alt="APJ Abdul Kalam"
                            />
                            <p className="text-xl text-gray-200">
                                "Learning gives creativity, creativity leads to thinking,
                                thinking provides knowledge, knowledge makes you great."
                            </p>
                            <h3 className="text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                className="w-40 rounded-full border-2 border-gray-400"
                                src={einstein}
                                alt="einstein"
                            />
                            <p className="text-xl text-gray-200">
                                "Education is not the learning of facts, but the training of the
                                mind to think."
                            </p>
                            <h3 className="text-2xl font-semibold">Albert Einstein</h3>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                className="w-40 rounded-full border-2 border-gray-400"
                                src={steveJobs}
                                alt="Steve Jobs"
                            />
                            <p className="text-xl text-gray-200">
                                "Innovation distinguishes between a leader and a follower."
                            </p>
                            <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide5" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    <div id="slide5" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img
                                className="w-40 rounded-full border-2 border-gray-400"
                                src={billGates}
                                alt="Bill Gates"
                            />
                            <p className="text-xl text-gray-200">
                                "Technology is just a tool. In terms of getting the kids working
                                together and motivating them, the teacher is the most
                                important."
                            </p>
                            <h3 className="text-2xl font-semibold">Bill Gates</h3>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide1" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AboutUs;
