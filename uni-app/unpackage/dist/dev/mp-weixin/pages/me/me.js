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
      latitude: 34.352,
      longitude: 113.38,
      iconPath: "@/static/imgs/me/avator.png"
    }, {
      latitude: 34.351,
      longitude: 113.39,
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
