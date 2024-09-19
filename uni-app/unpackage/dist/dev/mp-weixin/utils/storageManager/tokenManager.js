"use strict";
var common_vendor = require("../../common/vendor.js");
const TOKEN_KEY = "token";
const getToekn = () => {
  return common_vendor.index.getStorageSync(TOKEN_KEY);
};
const removeToken = () => {
  common_vendor.index.removeStorageSync(TOKEN_KEY);
};
exports.getToekn = getToekn;
exports.removeToken = removeToken;
