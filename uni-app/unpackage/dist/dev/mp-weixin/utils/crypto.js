"use strict";
var common_vendor = require("../common/vendor.js");
const publicKye = "04743cea5d6be92eb31c7359808c953ae0d6c824cf25ac5de8bcac589ac3caf2a77b568e39651ddf19fe455231eb925878a01e23de1c482ee9598fb40f64f15654";
const sm2Encrypt = (str) => {
  let encryptPwd = common_vendor.src.sm2.doEncrypt(str, publicKye);
  return "04" + encryptPwd;
};
exports.sm2Encrypt = sm2Encrypt;
