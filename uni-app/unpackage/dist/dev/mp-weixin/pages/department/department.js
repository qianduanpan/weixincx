"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_department_airport = require("./airport.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  (_easycom_uni_search_bar2 + _easycom_uni_indexed_list2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_indexed_list)();
}
const _sfc_main = {
  setup(__props) {
    const list = common_vendor.ref([]);
    list.value = pages_department_airport.airport.list;
    const bindClick = (e) => {
      console.log("\u70B9\u51FBitem\uFF0C\u8FD4\u56DE\u6570\u636E" + JSON.stringify(e), e);
    };
    const search = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.p({
          radius: "100",
          placeholder: "\u8BF7\u8F93\u5165",
          clearButton: "none",
          cancelButton: "none"
        }),
        c: common_vendor.o(bindClick),
        d: common_vendor.p({
          options: list.value,
          ["show-select"]: false
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0628aff4"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/department/department.vue"]]);
wx.createPage(MiniProgramPage);
