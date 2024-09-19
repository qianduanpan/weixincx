"use strict";
var common_vendor = require("../../common/vendor.js");
const USERINFO_KEY = "userInfo";
let userInfo = common_vendor.index.getStorageSync(USERINFO_KEY) || null;
const getUserInfo = () => {
  return userInfo;
};
const removeUserInfo = () => {
  userInfo = null;
  return common_vendor.index.removeStorageSync(USERINFO_KEY);
};
exports.getUserInfo = getUserInfo;
exports.removeUserInfo = removeUserInfo;
