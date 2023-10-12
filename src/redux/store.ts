import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import CourseSlice from './slices/CourseSlice'
import RazorpaySlice from './slices/RazorpaySlice'
import LectureSlice from './slices/LectureSlice'
import StatSlice from './slices/StatSlice'


const store = configureStore({
    reducer: {
        auth: AuthSlice,
        courses: CourseSlice,
        razorpay: RazorpaySlice,
        lecture: LectureSlice,
        stat: StatSlice
    },
    devTools: true
})

export default store