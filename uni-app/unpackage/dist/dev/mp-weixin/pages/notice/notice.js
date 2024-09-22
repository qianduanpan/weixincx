"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_tabs = common_vendor.resolveComponent("uni-tabs");
  _component_uni_tabs();
}
const _sfc_main = {
  setup(__props) {
    const tabs = ["\u6807\u7B7EA", "\u6807\u7B7EB"];
    const currentTab = common_vendor.ref(null);
    const handleTabChange = (index) => {
      console.log(`\u5207\u6362\u5230\u6807\u7B7E ${tabs[index]}`);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleTabChange),
        b: common_vendor.o(($event) => currentTab.value = $event),
        c: common_vendor.p({
          tabs,
          modelValue: currentTab.value
        }),
        d: currentTab.value === 0
      }, currentTab.value === 0 ? {} : {}, {
        e: currentTab.value === 1
      }, currentTab.value === 1 ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b680ac6"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
