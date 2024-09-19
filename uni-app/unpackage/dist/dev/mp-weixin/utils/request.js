"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../common/vendor.js");
var utils_crypto = require("./crypto.js");
var config_configService = require("../config/configService.js");
var utils_storageManager_tokenManager = require("./storageManager/tokenManager.js");
var utils_storageManager_userInfoManager = require("./storageManager/userInfoManager.js");
getApp();
const request = ({ url, method, header, data }) => {
  return new Promise((resolve, reject) => {
    let tempTime = new Date().getTime().toString();
    let defaultHeader = {
      "content-type": "application/json",
      token: utils_storageManager_tokenManager.getToekn() || "",
      source: "dy",
      "content-types": utils_crypto.sm2Encrypt(tempTime + "GoodLuck-wechat15037505633")
    };
    if (!defaultHeader.token) {
      delete defaultHeader.token;
    }
    if (header) {
      if (typeof header === "object") {
        Object.assign(defaultHeader, __spreadValues({}, header), {});
      } else {
        throw "header\u4E0D\u662F\u4E00\u4E2A\u5BF9\u8C61";
      }
    }
    common_vendor.index.request({
      url: `${config_configService.configService.apiUrl}${url}`,
      method: method.toUpperCase(),
      header: defaultHeader,
      data,
      success: (res) => {
        if (res.data.code == 401) {
          utils_storageManager_userInfoManager.removeUserInfo();
          utils_storageManager_tokenManager.removeToken();
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          resolve(res.data);
        }
      },
      fail: (err) => {
        console.log("\u5931\u8D25", err);
        reject(err.data);
      }
    });
  });
};
exports.request = request;
