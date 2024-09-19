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
  "./pages/login/login.js";
  "./pages/me/me.js";
}
function checkUpdate() {
  if (common_vendor.index.canIUse("getUpdateManager")) {
    const updateManager = common_vendor.index.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          common_vendor.index.showModal({
            title: "\u6E29\u99A8\u63D0\u793A",
            content: "\u65B0\u7248\u672C\u5DF2\u7ECF\u51C6\u5907\u597D\uFF0C\u8BF7\u91CD\u542F\u5E94\u7528",
            showCancel: true,
            success: (res2) => {
              if (res2.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(() => {
          common_vendor.index.showModal({
            title: "\u66F4\u65B0\u5931\u8D25",
            content: "\u8BF7\u60A8\u5220\u9664\u5F53\u524D\u5C0F\u7A0B\u5E8F\uFF0C\u91CD\u65B0\u6253\u5F00\u5C0F\u7A0B\u5E8F"
          });
        });
      }
    });
  } else {
    common_vendor.index.showModal({
      title: "\u6E29\u99A8\u63D0\u793A",
      content: "\u5F53\u524D\u6296\u97F3\u7248\u672C\u8FC7\u4F4E\uFF0C\u53EF\u80FD\u65E0\u6CD5\u4F7F\u7528\u8BE5\u529F\u80FD\uFF0C\u8BF7\u5347\u7EA7\u5230\u6700\u65B0\u7248\u672C\u540E\u91CD\u8BD5\u3002"
    });
  }
}
const _sfc_main = {
  globalData: {
    customerPhone: "16238800000"
  },
  onLaunch: function() {
    checkUpdate();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/uni-app/uni-app/App.vue"]]);
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
