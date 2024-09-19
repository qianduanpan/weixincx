const OPERATORINFO_KEY = 'operator';
export let operator = uni.getStorageSync(OPERATORINFO_KEY) || null;

export const setOperatorInfo = (value) => {
	operator = value;
	uni.setStorageSync(OPERATORINFO_KEY, value);
};

export const getOperatorInfo = () => {
	return operator;
};

export const removeOperatorInfo = () => {
	operator = null;
	return uni.removeStorageSync(OPERATORINFO_KEY);
};
