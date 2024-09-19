const USERINFO_KEY = 'userInfo';
export let userInfo = uni.getStorageSync(USERINFO_KEY) || null;

export const setUserInfo = (value) => {
  userInfo = value;
  uni.setStorageSync(USERINFO_KEY, value);
};

export const getUserInfo = () => {
  return userInfo;
};

export const removeUserInfo = () => {
  userInfo = null;
  return uni.removeStorageSync(USERINFO_KEY);
};
