"use strict";
let BASE_URL = "";
let envVersion = "";
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
