export const TOKEN_KEY = 'token';

export const setToken = (value) => {
	uni.setStorageSync(TOKEN_KEY, value);
};

export const getToekn = () => {
	return uni.getStorageSync(TOKEN_KEY);
};

export const removeToken = () => {
	uni.removeStorageSync(TOKEN_KEY);
};
