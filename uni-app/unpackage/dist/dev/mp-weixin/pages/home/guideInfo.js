"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const guideInfoListClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/home/guideInfoList`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(guideInfoListClick)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fcd66f5a"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/home/guideInfo.vue"]]);
wx.createPage(MiniProgramPage);
