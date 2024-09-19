import request from './request';
import apis from '@/config/api';
import { getUserInfo } from '@/utils/storageManager/userInfoManager.js';
import pagesJson from '@/pages.json';
const pagesConfig = pagesJson.pages;
let userIpAndAddress = null;

export function getUserIpAndAddress() {
	return userIpAndAddress;
}
export function setUserIpAndAddress(info) {
	userIpAndAddress = info;
}

// 埋点插入方法
export const userEventTracking = (data) => {
	const userInfo = getUserInfo();
	// 插入埋点
	if (userInfo && userIpAndAddress) {
		request({
			url: apis.eventTracking,
			method: 'post',
			data: {
				...data,
				realAddress: userIpAndAddress.addressName,
				longitude: userIpAndAddress.location.lng,
				latitude: userIpAndAddress.location.lat,
				createBy: userInfo.id,
			},
		});
	}
};
export function getPageRouteTitle() {
	const pages = getCurrentPages();
	const route = pages[pages.length - 1].route;
	const pageConfig = pagesConfig.find((item) => item.path === route);
	// const title = __allConfig__[route]?.navigationBarTitleText || '';
	const title = pageConfig?.style?.navigationBarTitleText || '';
	return title + route;
}
export const loadPageUserEventTracking = {
	onLoad() {
		userEventTracking({
			actionStr: `用户进入${getPageRouteTitle()}页面`,
			actionType: '1',
		});
	},
};
