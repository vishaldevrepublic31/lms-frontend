import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses: any = createAsyncThunk('/course/get', async () => {
    try {
        const res = axiosInstance.get('/course')
        return (await res).data.courses
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
})
export const deleteCourse: any = createAsyncThunk("/course/delete", async (id: any) => {
    try {
        const response = axiosInstance.delete(`/course/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});
export const createNewCourse: any = createAsyncThunk("/course/create", async (data: any) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/course", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state: any, action) => {
            if (action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
})

export default courseSlice.reducer