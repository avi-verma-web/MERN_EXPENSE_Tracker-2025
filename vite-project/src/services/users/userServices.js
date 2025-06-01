import { getUserFromStorage } from "../../utils/manageStorage";
import { BASE_URL } from "../../utils/url";

import axios from "axios";

export const loginAPI = async (userData) => {
	const { email, password } = userData;
	const response = await axios.post(`${BASE_URL}/users/login`, {
		email,
		password,
	});
	return response.data;
};

export const RegisterAPI = async (userData) => {
	const { email, password, username } = userData;
	const response = await axios.post(`${BASE_URL}/users/register`, {
		email,
		password,
		username,
	});
	return response.data;
};

export const changePasswordAPI = async (password) => {
	const token = getUserFromStorage();
	const response = await axios.put(
		`${BASE_URL}/users/change-password`,
		{
			newPassword: password,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};

export const updateProfileAPI = async (userData) => {
	const token = getUserFromStorage();
	const { email, username } = userData;
	const response = await axios.put(
		`${BASE_URL}/users/update-profile`,
		{
			email,
			username,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};

export const getProfileAPI = async () => {
	const token = getUserFromStorage();
	const response = await axios.get(
		`${BASE_URL}/users/profile`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};
