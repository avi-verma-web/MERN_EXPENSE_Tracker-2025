import { getUserFromStorage } from "../../utils/manageStorage";
import { BASE_URL } from "../../utils/url";

import axios from "axios";

export const addCategoryAPI = async (userData) => {
	const token = getUserFromStorage();
	const { name, type } = userData;
	const response = await axios.post(
		`${BASE_URL}/categories/create`,
		{
			name,
			type,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};

export const listCategoriesAPI = async () => {
	const token = getUserFromStorage();
	const response = await axios.get(`${BASE_URL}/categories/lists`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const updateCategoryAPI = async (userData) => {
	const token = getUserFromStorage();
	const { name, type, id } = userData;
	const response = await axios.put(
		`${BASE_URL}/categories/update/${id}`,
		{
			name,
			type,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};

export const deleteCategoryAPI = async (id) => {
	const token = getUserFromStorage();
	const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
