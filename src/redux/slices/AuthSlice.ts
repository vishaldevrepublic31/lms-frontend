import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

interface IAuthState {
    isLoggedIn: string | boolean;
    role: string;
    data: string | {};
}

const initialState: IAuthState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") != undefined ? JSON.parse(localStorage.getItem("data")!) : {},
};

export const createAccount: any = createAsyncThunk(
    "/auth/signup",
    async (data) => {
        try {
            const res = axiosInstance.post("/user/register", data);
            toast.promise(res, {
                loading: "Wait! creating your account",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to create account",
            });
            return (await res).data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const login: any = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in",
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout: any = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("/user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout",
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

export const changePassword: any = createAsyncThunk("/auth/changepassword", async (data) => {
    try {
        const res = axiosInstance.post("/user/change-password", data);
        toast.promise(res, {
            loading: "Wait! change password in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to change password",
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});

export const forgotPassword: any = createAsyncThunk("/auth/forgotpassword", async (data) => {
    try {
        const res = axiosInstance.post("/user/forgot-password", data);
        toast.promise(res, {
            loading: "Wait! sent link your email address...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed",
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});


export const resetPassword: any = createAsyncThunk("/auth/resetpassword", async (data: any) => {
    try {
        const res = axiosInstance.post(`/user/reset-password/${data.resetToken}`, data);
        toast.promise(res, {
            loading: "Wait! sent link your email address...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed",
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
});
export const updateProfile: any = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update`, data);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData: any = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch (error: any) {
        toast.error(error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            }).addCase(getUserData.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", 'true');
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role
            });
    },
});
console.log(authSlice.actions);
// export const { login } = authSlice.actions
export default authSlice.reducer;
