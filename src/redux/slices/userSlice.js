import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  full_name: "",
  user_birth: "",
  user_sex: "",
  user_name: "",
  user_email: "",
  user_phone: "",
  user_address: [],
  user_avt_img: "",
  _id: "",
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: Cookies.get("refreshToken"),
  isAuthenticated: !!Cookies.get("accessToken"), // Check if accessToken exists
};

// Utility to filter payload fields
const filterPayload = (payload, state) => {
  const filteredPayload = {};
  Object.keys(state).forEach((key) => {
    if (key in payload) {
      filteredPayload[key] = payload[key];
    }
  });
  return filteredPayload;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const filteredPayload = filterPayload(action.payload, state);
      return {
        ...state,
        ...filteredPayload,
        isAuthenticated: true, // Ensure user is authenticated
      };
    },
    resetUser: (state) => {
      return {
        ...state,
        full_name: "",
        user_birth: "",
        user_sex: "",
        user_name: "",
        user_email: "",
        user_phone: "",
        user_address: [],
        user_avt_img: "",
        _id: "",
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
      };
    },
    logout: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...initialState,
        accessToken: "", // Clear tokens
        refreshToken: "",
        isAuthenticated: false,
      };
    },
  },
});

export const { updateUser, resetUser, logout } = userSlice.actions;
export default userSlice.reducer;