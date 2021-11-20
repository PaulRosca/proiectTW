import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: JSON.parse(localStorage.getItem("user")),
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: state => {
            return null;
        },
        signup: (state, action) => {
            return action.payload;
        }
    }
})

export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;