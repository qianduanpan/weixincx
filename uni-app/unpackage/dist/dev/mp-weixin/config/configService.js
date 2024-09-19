"use strict";
var common_vendor = require("../common/vendor.js");
let BASE_URL = "";
let envVersion = "";
const accountInfo = common_vendor.index.getAccountInfoSync();
envVersion = accountInfo.miniProgram.envVersion;
switch (envVersion) {
  case "develop":
    break;
  case "development":
    BASE_URL = "";
    break;
  case "preview":
    BASE_URL = "";
    break;
  case "trial":
    BASE_URL = "";
    break;
  case "release":
    BASE_URL = "";
    break;
  case "production":
    BASE_URL = "";
    break;
  default:
    BASE_URL = "";
    break;
}
console.log(envVersion, BASE_URL);
const configService = {
  apiUrl: BASE_URL,
  envVersion
};
exports.configService = configService;
