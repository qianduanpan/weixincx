import { sm2Encrypt, md5Encrypt } from './crypto';
import configService from '@/config/configService.js';
import { getToekn, removeToken } from '@/utils/storageManager/tokenManager.js';
import { removeUserInfo } from '@/utils/storageManager/userInfoManager.js';
const app = getApp();
const request = ({ url, method, header, data }) => {
	// console.log('调用接口->', `${configService.apiUrl}${url}`);
	return new Promise((resolve, reject) => {
		let tempTime = new Date().getTime().toString();
		let defaultHeader = {
			'content-type': 'application/json',
			token: getToekn() || '',
			source: 'dy',
			'content-types': sm2Encrypt(tempTime + 'GoodLuck-wechat15037505633'),
			// "Refererr":md5Encrypt("wx"+tempTime.toString())
		};
		if (!defaultHeader.token) {
			delete defaultHeader.token;
		}
		if (header) {
			// 判断header是不是对象
			if (typeof header === 'object') {
				Object.assign(defaultHeader, { ...header }, {});
			} else {
				throw 'header不是一个对象';
			}
		}
		uni.request({
			url: `${configService.apiUrl}${url}`,
			method: method.toUpperCase(),
			header: defaultHeader,
			data,
			success: (res) => {
				// 如果401 直接跳转登录页面
				if (res.data.code == 401) {
					// 退出登录，删除缓存
					removeUserInfo();
					// 删除token
					removeToken();
					uni.navigateTo({
						url: '/pages/login/login',
					});
				} else {
					resolve(res.data);
				}
			},
			fail: (err) => {
				console.log('失败', err);
				reject(err.data);
			},
		});
	});
};

export default request;
