"use strict";
var common_vendor = require("../../common/vendor.js");
var _imports_0 = "/static/imgs/me/user.png";
var _imports_1 = "/static/imgs/me/icon1.png";
var _imports_2 = "/static/imgs/me/jiantou.png";
var _imports_3 = "/static/imgs/me/icon2.png";
var _imports_4 = "/static/imgs/me/icon3.png";
var _imports_5 = "/static/imgs/me/icon4.png";
const _sfc_main = {
  setup(__props) {
    common_vendor.ref("0");
    common_vendor.ref("39.909");
    common_vendor.ref("116.39742");
    common_vendor.ref([{
      latitude: 33.688235,
      longitude: 113.264273,
      iconPath: "@/static/imgs/me/avator.png"
    }, {
      latitude: 33.688235,
      longitude: 113.264273,
      iconPath: "@/static/imgs/me/avator.png"
    }]);
    const suggestionClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/me/suggestion`
      });
    };
    const handleClick = () => {
      console.log("\u6309\u94AE\u88AB\u70B9\u51FB\u4E86\uFF01");
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
        a: _imports_0,
        b: _imports_1,
        c: _imports_2,
        d: _imports_3,
        e: _imports_2,
        f: common_vendor.o(handleClick),
        g: _imports_4,
        h: _imports_2,
        i: common_vendor.o(suggestionClick),
        j: _imports_5,
        k: _imports_2
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-259fb574"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
