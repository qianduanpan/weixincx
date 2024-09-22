"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.index.openLocation({
        latitude: 34.35,
        longitude: 113.38,
        name: "\u6CB3\u5357\u4E2D\u533B\u836F\u5927\u5B66",
        address: "\u90D1\u5DDE\u5E02\u91D1\u6C34\u533A\u4E1C\u660E\u8DEF63\u53F7",
        success() {
          common_vendor.index.chooseLocation({
            success: (res) => {
              common_vendor.index.openLocation({
                latitude: res.latitude,
                longitude: res.longitude,
                name: res.name,
                address: res.address,
                success() {
                  console.log("\u5BFC\u822A\u542F\u52A8");
                },
                fail(err) {
                  console.error("\u5BFC\u822A\u5931\u8D25", err);
                }
              });
            },
            fail(err) {
              console.error("\u9009\u62E9\u4F4D\u7F6E\u5931\u8D25", err);
            }
          });
        },
        fail(err) {
          console.error("\u6253\u5F00\u4F4D\u7F6E\u5931\u8D25", err);
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ab9f78f"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/components/navigation.vue"]]);
wx.createPage(MiniProgramPage);
