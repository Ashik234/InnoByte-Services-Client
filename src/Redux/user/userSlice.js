import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId:"",
        username: "",
        email:"",
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.email = action.payload.email
        }
    }
})

export const { changeUserDetails } = UserSlice.actions
export default UserSlice.reducer