export let platformName = '';

// 判断当前平台
// #ifdef APP-PLUS
platformName = 'APP-PLUS';
// #endif

// #ifdef APP-PLUS-NVUE
platformName = 'APP-PLUS-NVUE';
// #endif

// #ifdef H5
platformName = 'H5';
// #endif

// #ifdef QUICKAPP-WEBVIEW
platformName = 'QUICKAPP-WEBVIEW';
// #endif

// #ifdef QUICKAPP-WEBVIEW-UNION
platformName = 'QUICKAPP-WEBVIEW-UNION';
// #endif

// #ifdef QUICKAPP-WEBVIEW-HUAWEI
platformName = 'QUICKAPP-WEBVIEW-HUAWEI';
// #endif

// #ifdef QUICKAPP
platformName = 'QUICKAPP';
// #endif

// #ifdef H5-PLUS
platformName = 'H5-PLUS';
// #endif

// #ifdef MP-WEIXIN
platformName = 'MP-WEIXIN';
// #endif

// #ifdef MP-ALIPAY
platformName = 'MP-ALIPAY';
// #endif

// #ifdef MP-BAIDU
platformName = 'MP-BAIDU';
// #endif

// #ifdef MP-TOUTIAO
platformName = 'MP-TOUTIAO';
// #endif

// #ifdef MP-QQ
platformName = 'MP-QQ';
// #endif

// #ifdef MP-360
platformName = 'MP-360';
// #endif

// 导出平台信息
export const getPlatformName = () => platformName;
