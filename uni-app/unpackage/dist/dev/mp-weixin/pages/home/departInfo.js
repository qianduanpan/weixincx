"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    common_vendor.useRoute();
    const name = common_vendor.ref("\u7CBE\u795E\u79D1\u95E8\u8BCA");
    common_vendor.onLoad((options) => {
      console.log(options, "999");
      name.value = options.name;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(name.value)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd415cee"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/home/departInfo.vue"]]);
wx.createPage(MiniProgramPage);
