import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    lectures: []
}


export const getCourseLectures: any = createAsyncThunk("/course/lecture/get", async (cid) => {
    try {
        const response = axiosInstance.get(`/course/${cid}`);
        toast.promise(response, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load the lectures"
        });
        return (await response).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture: any = createAsyncThunk("/course/lecture/add", async (data: any) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/course/${data.id}`, formData);
        toast.promise(response, {
            loading: "adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        return (await response).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture: any = createAsyncThunk("/course/lecture/delete", async (data: any) => {
    try {

        const response = axiosInstance.delete(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "deleting course lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete the lectures"
        });
        return (await response).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
            .addCase(addCourseLecture.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures;
            })
    }
});

export default lectureSlice.reducer;