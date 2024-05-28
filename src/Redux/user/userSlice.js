import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    username: "",
    email: "",
    about: "",
    contact: "",
    image: "",
  },
  reducers: {
    changeUserDetails: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.about = action.payload.about;
      state.contact = action.payload.contact;
      state.image = action.payload.image;
    },
  },
});

export const { changeUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
