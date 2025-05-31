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
