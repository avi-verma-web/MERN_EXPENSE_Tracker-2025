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
