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
      navigationBarTitleText: "\u9996\u9875",
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/home/expertInfo",
    style: {
      navigationBarTitleText: "\u4E13\u5BB6\u5217\u8868"
    }
  },
  {
    path: "pages/home/expertUserInfo",
    style: {
      navigationBarTitleText: "\u4E13\u5BB6\u4ECB\u7ECD"
    }
  },
  {
    path: "pages/home/departInfo",
    style: {
      navigationBarTitleText: "\u79D1\u5BA4\u8BE6\u60C5"
    }
  },
  {
    path: "pages/home/guideInfo",
    style: {
      navigationBarTitleText: "\u5C31\u533B\u6307\u5357"
    }
  },
  {
    path: "pages/home/guideInfoList",
    style: {
      navigationBarTitleText: "\u5C31\u533B\u6307\u5357\u8BE6\u60C5"
    }
  },
  {
    path: "pages/department/department",
    style: {
      navigationBarTitleText: "\u79D1\u5BA4\u5217\u8868"
    }
  },
  {
    path: "pages/notice/notice",
    style: {
      navigationBarTitleText: "\u516C\u544A\u54A8\u8BE2"
    }
  },
  {
    path: "pages/notice/noticeList",
    style: {
      navigationBarTitleText: "\u54A8\u8BE2\u8BE6\u60C5"
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
      navigationBarTitleText: "\u6211\u7684",
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/me/suggestion",
    style: {
      navigationBarTitleText: "\u6295\u8BC9\u5EFA\u8BAE"
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
      pagePath: "pages/department/department",
      iconPath: "static/imgs/tabbar/tabbar-order-default.png",
      selectedIconPath: "static/imgs/tabbar/tabbar-order-active.png",
      text: "\u79D1\u5BA4\u4FE1\u606F"
    },
    {
      pagePath: "pages/notice/notice",
      iconPath: "static/imgs/tabbar/tabbar-notice-default.png",
      selectedIconPath: "static/imgs/tabbar/tabbar-notice-active.png",
      text: "\u516C\u544A\u54A8\u8BE2"
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
const easycom = {
  custom: {
    "^u--(.*)": "@/node_modules/uview-plus/components/u-$1/u-$1.vue",
    "^up-(.*)": "@/node_modules/uview-plus/components/u-$1/u-$1.vue",
    "^u-([^-].*)": "@/node_modules/uview-plus/components/u-$1/u-$1.vue"
  }
};
const condition = {
  current: 0,
  list: [
    {
      name: "",
      path: "",
      query: ""
    }
  ]
};
var pagesJson = {
  entryPagePath,
  pages,
  tabBar,
  globalStyle,
  easycom,
  condition
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
