"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const tabs = ["\u6700\u65B0\u52A8\u6001", "\u5065\u5EB7\u8D44\u8BAF"];
    const activeIndex = common_vendor.ref(0);
    const noticeListClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/notice/noticeList`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabs, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: activeIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => activeIndex.value = index),
            d: activeIndex.value === index ? 1 : "",
            e: index
          };
        }),
        b: activeIndex.value === 0
      }, activeIndex.value === 0 ? {
        c: common_vendor.o(noticeListClick),
        d: common_vendor.o(noticeListClick),
        e: common_vendor.o(noticeListClick),
        f: common_vendor.o(noticeListClick),
        g: common_vendor.o(noticeListClick)
      } : {}, {
        h: activeIndex.value === 1
      }, activeIndex.value === 1 ? {
        i: common_vendor.o(noticeListClick),
        j: common_vendor.o(noticeListClick)
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b680ac6"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
