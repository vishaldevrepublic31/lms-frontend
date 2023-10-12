import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layout/HomeLayout"
import { getAllCourses } from "../../redux/slices/CourseSlice"
import { useEffect } from "react"
import CourseCard from "../../components/CourseCard"
import React from "react"
const CourseList: React.FC = () => {
    const dispatch = useDispatch()
    const { courseData } = useSelector((state: any) => state.courses)

    function loadCourses() {
        dispatch(getAllCourses())
    }

    useEffect(() => {
        loadCourses()
    }, []);
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by
                    <span className="ms-1 font-bold text-yellow-500">
                        Industry experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element: any) => {
                        return <CourseCard key={element._id} data={element} />
                    })}
                </div>


            </div>
        </HomeLayout>
    )
}

export default CourseList
