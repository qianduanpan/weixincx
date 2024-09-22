"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = {
  setup(__props) {
    const userInfoClickFn = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/home/expertUserInfo`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_ctx.search),
        b: common_vendor.p({
          radius: "100",
          placeholder: "\u8BF7\u8F93\u5165\u533B\u751F\u59D3\u540D",
          clearButton: "none",
          cancelButton: "none"
        }),
        c: common_vendor.o(userInfoClickFn),
        d: common_vendor.o(userInfoClickFn),
        e: common_vendor.o(userInfoClickFn),
        f: common_vendor.o(userInfoClickFn),
        g: common_vendor.o(userInfoClickFn)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6a8961bf"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/home/expertInfo.vue"]]);
wx.createPage(MiniProgramPage);
