import { createSlice } from "@reduxjs/toolkit";
import { USER_INFO } from "../../utils/userStorageKey";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: JSON.parse(localStorage.getItem(USER_INFO)) || null,
	},
	reducers: {
		loginAction: (state, action) => {
			state.user = action.payload;
		},
		logoutAction: (state, action) => {
			state.user = null;
			localStorage.removeItem(USER_INFO);
		},
	},
});

export const { loginAction, logoutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
