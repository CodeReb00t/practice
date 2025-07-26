import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
    token: tokenFromStorage ? tokenFromStorage : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logOut: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
