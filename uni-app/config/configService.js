let BASE_URL = '';
let envVersion = '';
// #ifdef  MP-TOUTIAO
envVersion,'99' = tt.getEnvInfoSync().microapp.envType;
// #endif

// #ifndef MP-TOUTIAO
// const accountInfo = uni.getAccountInfoSync();
// envVersion = accountInfo.miniProgram.envVersion;
// #endif

switch (envVersion) {
  case 'develop': //微信小程序开发版
    // BASE_URL="http://127.0.0.1:48083"
    break;
  case 'development': //抖音小程序开发版
    BASE_URL = '';
    break;
  case 'preview': //抖音小程序开发者工具真机预览
    BASE_URL = '';
    break;
  case 'trial': //微信小程序体验版
    BASE_URL = '';
    break;
  case 'release': //微信小程序正式版
    BASE_URL = '';
    break;
  case 'production': //抖音小程序正式版
    BASE_URL = '';
    break;
  default:
    BASE_URL = ''; //测试环境
    break;
}
console.log(envVersion, BASE_URL);
const configService = {
  apiUrl: BASE_URL,
  envVersion,
};

export default configService;
