import { getUserFromStorage } from "../../utils/manageStorage";
import { BASE_URL } from "../../utils/url";

import axios from "axios";

export const addTransactionAPI = async (userData) => {
	const token = getUserFromStorage();
	const { category, amount, date, description, type } = userData;
	const response = await axios.post(
		`${BASE_URL}/transactions/create`,
		{
			category,
			amount,
			date,
			description,
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

export const listTransactionsAPI = async (filters) => {
	const token = getUserFromStorage();
	const { startDate, endDate, type, category } = filters;
	const response = await axios.get(`${BASE_URL}/transactions/lists`, {
		params: { startDate, endDate, type, category },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const updateTransactionAPI = async (userData) => {
	const token = getUserFromStorage();
	const { type, category, amount, date, description, id } = userData;
	const response = await axios.put(
		`${BASE_URL}/transactions/update/${id}`,
		{ type, category, amount, date, description },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};

export const deleteTransactionAPI = async (id) => {
	const token = getUserFromStorage();
	const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
