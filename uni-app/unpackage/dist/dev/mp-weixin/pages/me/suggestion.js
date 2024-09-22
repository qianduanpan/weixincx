"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = {
  setup(__props) {
    const alignment = common_vendor.ref("top");
    const range = common_vendor.ref([
      { value: 0, text: "\u533B\u9662\u670D\u52A1" },
      { value: 1, text: "\u533B\u7597\u8D28\u91CF" },
      { value: 2, text: "\u533B\u7597\u8D39\u7528" }
    ]);
    const rous = common_vendor.ref([
      { value: 0, text: "\u4E00\u7EA7" },
      { value: 1, text: "\u4E8C\u7EA7" },
      { value: 2, text: "\u4E09\u7EA7\u7EA7" }
    ]);
    const alignmentFormData = common_vendor.ref({
      name: "",
      age: ""
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => alignmentFormData.value.name = $event),
        b: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u8054\u7CFB\u65B9\u5F0F",
          modelValue: alignmentFormData.value.name
        }),
        c: common_vendor.p({
          label: "\u8054\u7CFB\u65B9\u5F0F",
          required: true
        }),
        d: common_vendor.o(($event) => alignmentFormData.value.type = $event),
        e: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u6295\u8BC9\u7C7B\u578B",
          localdata: range.value,
          modelValue: alignmentFormData.value.type
        }),
        f: common_vendor.p({
          label: "\u6295\u8BC9\u7C7B\u578B",
          required: true
        }),
        g: common_vendor.o(($event) => alignmentFormData.value.rou = $event),
        h: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u7D27\u6025\u7A0B\u5EA6",
          localdata: rous.value,
          modelValue: alignmentFormData.value.rou
        }),
        i: common_vendor.p({
          label: "\u7D27\u6025\u7A0B\u5EA6",
          required: true
        }),
        j: common_vendor.sr("baseForm", "88af549c-0"),
        k: common_vendor.p({
          modelValue: alignmentFormData.value,
          ["label-position"]: alignment.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-88af549c"], ["__file", "D:/\u6B63\u6570/\u9879\u76EE/\u6D77\u6D0B/\u5FAE\u4FE1/weixincx/uni-app/pages/me/suggestion.vue"]]);
wx.createPage(MiniProgramPage);
