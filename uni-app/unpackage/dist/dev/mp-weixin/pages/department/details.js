"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const route = common_vendor.useRoute();
    console.log(route.query, "000");
    const param1 = route.query.param1;
    common_vendor.onMounted(() => {
      console.log("Params received:", param1.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(param1))
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-94d58384"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/department/details.vue"]]);
wx.createPage(MiniProgramPage);
