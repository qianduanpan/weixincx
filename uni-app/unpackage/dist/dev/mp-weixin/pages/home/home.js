"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const expertClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/home/expertInfo`
      });
    };
    const departClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/home/departInfo`
      });
    };
    const guideClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/home/guideInfo`
      });
    };
    const navigationClick = () => {
      common_vendor.index.openLocation({
        latitude: 33.688235,
        longitude: 113.264273,
        name: "\u5E73\u9876\u5C71\u5E02\u7B2C\u516D\u4EBA\u6C11\u533B\u9662",
        address: "\u6E5B\u6CB3\u533A\u5E73\u6850\u8DEF\u6C99\u6CB3\u6865100\u7C73\u5E73\u9876\u5C71\u5E02\u7B2C\u516D\u4EBA\u6C11\u533B\u9662",
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
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(expertClick),
        b: common_vendor.o(departClick),
        c: common_vendor.o(guideClick),
        d: common_vendor.o(navigationClick)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-92bb8f34"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
