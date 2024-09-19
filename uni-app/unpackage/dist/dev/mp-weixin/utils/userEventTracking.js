"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var utils_request = require("./request.js");
var config_api = require("../config/api.js");
var utils_storageManager_userInfoManager = require("./storageManager/userInfoManager.js");
const entryPagePath = "pages/home/home";
const pages = [
  {
    path: "pages/home/home",
    style: {
      backgroundColor: "#f5f5f5",
      navigationBarTitleText: "\u9996\u9875"
    }
  },
  {
    path: "pages/login/login",
    style: {
      navigationBarTitleText: "\u767B\u5F55"
    }
  },
  {
    path: "pages/me/me",
    style: {
      navigationBarTitleText: "\u6211\u7684"
    }
  }
];
const tabBar = {
  color: "#ADADB2;",
  selectedColor: "#436195",
  borderStyle: "white",
  backgroundColor: "#ffffff",
  list: [
    {
      pagePath: "pages/home/home",
      iconPath: "static/imgs/tabbar/tabbar-home-default.png",
      selectedIconPath: "static/imgs/tabbar/tabbar-home-active.png",
      text: "\u9996\u9875"
    },
    {
      pagePath: "pages/orderList/orderList",
      iconPath: "static/imgs/tabbar/tabbar-order-default.png",
      selectedIconPath: "static/imgs/tabbar/tabbar-order-active.png",
      text: "\u8BA2\u5355"
    },
    {
      pagePath: "pages/me/me",
      iconPath: "static/imgs/tabbar/tabbar-me-default.png",
      selectedIconPath: "static/imgs/tabbar/tabbar-me-active.png",
      text: "\u6211\u7684"
    }
  ]
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "xxxx",
  navigationBarBackgroundColor: "#fff",
  backgroundColor: "#f7f7f7"
};
var pagesJson = {
  entryPagePath,
  pages,
  tabBar,
  globalStyle
};
const pagesConfig = pagesJson.pages;
let userIpAndAddress = null;
const userEventTracking = (data) => {
  const userInfo = utils_storageManager_userInfoManager.getUserInfo();
  if (userInfo && userIpAndAddress) {
    utils_request.request({
      url: config_api.apis.eventTracking,
      method: "post",
      data: __spreadProps(__spreadValues({}, data), {
        realAddress: userIpAndAddress.addressName,
        longitude: userIpAndAddress.location.lng,
        latitude: userIpAndAddress.location.lat,
        createBy: userInfo.id
      })
    });
  }
};
function getPageRouteTitle() {
  var _a;
  const pages2 = getCurrentPages();
  const route = pages2[pages2.length - 1].route;
  const pageConfig = pagesConfig.find((item) => item.path === route);
  const title = ((_a = pageConfig == null ? void 0 : pageConfig.style) == null ? void 0 : _a.navigationBarTitleText) || "";
  return title + route;
}
const loadPageUserEventTracking = {
  onLoad() {
    userEventTracking({
      actionStr: `\u7528\u6237\u8FDB\u5165${getPageRouteTitle()}\u9875\u9762`,
      actionType: "1"
    });
  }
};
exports.getPageRouteTitle = getPageRouteTitle;
exports.loadPageUserEventTracking = loadPageUserEventTracking;
exports.userEventTracking = userEventTracking;
