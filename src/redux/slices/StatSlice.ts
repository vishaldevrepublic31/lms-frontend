import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";
const initialState = {
    allUsersCount: 0,
    subscribedCount: 0
};

export const getStatsData: any = createAsyncThunk("stats/get", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users");
        return (await response).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
})

const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
        })
    }
});

export default statSlice.reducer;