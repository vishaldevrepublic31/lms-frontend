import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../redux/slices/CourseSlice';
import { getStatsData } from '../../redux/slices/StatSlice';
import { getPaymentRecord } from '../../redux/slices/RazorpaySlice';
import HomeLayout from '../../layout/HomeLayout';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { GiMoneyStack } from 'react-icons/gi';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

const AdminDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedCount } = useSelector((state: any) => state.stat);

    const myCourses = useSelector((state: any) => state?.courses?.courseData);

    const { allPayments, monthlySalesRecord } = useSelector((state: any) => state.razorpay);

    const [filters, setFilters] = useState({ courseName: '', instructor: '' });
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const uniqueInstructor: any = [...new Set(myCourses.map((myCourse) => myCourse.createdBy.toLowerCase()))];

    const handleSortClick = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const uniqueInstructorCoursesCount = {};

    myCourses.forEach((course: { createdBy: string; }) => {
        const instructor = course.createdBy.toLowerCase();
        if (uniqueInstructorCoursesCount[instructor]) {
            uniqueInstructorCoursesCount[instructor]++;
        } else {
            uniqueInstructorCoursesCount[instructor] = 1;
        }
    });

    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const sortedCourses: any = myCourses
        ?.filter((course: any) => {
            const courseMatch: any =
                course.title.toLowerCase().includes(filters.courseName.toLowerCase()) &&
                course.createdBy.toLowerCase().includes(filters.instructor.toLowerCase());
            return courseMatch;
        })
        .sort((courseA: any, courseB: any) => {
            if (sortOrder === 'asc') {
                return courseA.numberOfLectures - courseB.numberOfLectures;
            } else {
                return courseB.numberOfLectures - courseA.numberOfLectures;
            }
        });

    const userData = {
        labels: ['Registered User', 'Enrolled User'],
        fontColor: 'white',
        datasets: [
            {
                label: 'User Details',
                data: [allUsersCount, subscribedCount],
                backgroundColor: ['yellow', 'green'],
                borderWidth: 1,
                borderColor: ['yellow', 'green'],
            },
        ],
    };
    let uniqueInstructorCoursesCountNumber = [3, 3];
    const totalCourseData = {
        labels: uniqueInstructor,
        fontColor: 'white',
        datasets: [
            {
                label: 'User Details',
                data: uniqueInstructorCoursesCountNumber,
                backgroundColor: ['yellow', 'green'],
                borderWidth: 1,
                borderColor: ['yellow', 'green'],
            },
        ],
    };

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        fontColor: 'white',
        datasets: [
            {
                label: 'Sales / Month',
                data: monthlySalesRecord,
                backgroundColor: ['red'],
                borderColor: ['white'],
                borderWidth: 2,
            },
        ],
    };

    async function onCourseDelete(id: any) {
        if (window.confirm('Are you sure you want to delete the course ? ')) {
            const res = await dispatch(deleteCourse(id));

            if (res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(() => {
        (async () => {
            dispatch(getAllCourses());
            dispatch(getStatsData());
            dispatch(getPaymentRecord());
        })();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">Admin Dashboard</h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered Users</p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscribed Users</p>
                                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">Courses overview</h1>
                        <input
                            type="text"
                            className="bg-transparent border p-2 rounded-md"
                            placeholder="Course Name"
                            name="courseName"
                            onChange={handleFilter}
                        />
                        <input
                            type="text"
                            className="bg-transparent border p-2 rounded-md"
                            placeholder="Instructor"
                            name="instructor"
                            onChange={handleFilter}
                        />
                        <button
                            onClick={() => {
                                navigate('/course/create');
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                        >
                            Create new course
                        </button>
                    </div>

                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr className="text-white">
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th
                                    className="flex justify-center items-center gap-3 cursor-pointer"
                                    onClick={handleSortClick}
                                >
                                    <span>Total Lectures</span>
                                    <span className="text-lg">
                                        {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                                    </span>
                                </th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCourses?.map((course, idx) => {
                                return (
                                    <tr key={course._id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                        </td>
                                        <td>{course?.category}</td>
                                        <td>{course?.createdBy}</td>
                                        <td>{course?.numberOfLectures}</td>
                                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                            <textarea value={course?.description} readOnly className="w-80 h-auto bg-transparent resize-none"></textarea>
                                        </td>
                                        <td className="flex items-center gap-4">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => navigate('/course/displaylectures', { state: { ...course } })}
                                            >
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => onCourseDelete(course?._id)}
                                            >
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mx-[10%] mb-10">
                    <h1 className="text-center text-xl font-semibold mb-2">Total courses created by Instructors</h1>
                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr className="text-white">
                                <th>S No</th>
                                <th>Instructor</th>
                                <th>Total courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueInstructor?.map((instructor, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{instructor}</td>
                                        <td>{uniqueInstructorCoursesCount[instructor]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AdminDashboard;
