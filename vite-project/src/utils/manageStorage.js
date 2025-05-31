import { USER_INFO } from "./userStorageKey";

export const getUserFromStorage = () => {
	const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
	return userInfo?.token;
};

export const removeUserFromStorage = () => {
	localStorage.removeItem(USER_INFO);
};
