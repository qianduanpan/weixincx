"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_share = require("./utils/share.js");
var utils_userEventTracking = require("./utils/userEventTracking.js");
require("./utils/request.js");
require("./utils/crypto.js");
require("./config/configService.js");
require("./utils/storageManager/tokenManager.js");
require("./utils/storageManager/userInfoManager.js");
require("./config/api.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/department/department.js";
  "./pages/department/details.js";
  "./pages/notice/notice.js";
  "./pages/login/login.js";
  "./pages/me/me.js";
}
const _sfc_main = {
  globalData: {
    customerPhone: "16238800000"
  },
  onLaunch: function() {
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.mixin(utils_share.share);
  app.mixin(utils_userEventTracking.loadPageUserEventTracking);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
