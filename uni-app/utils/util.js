import request from './request';
import apis from '@/config/api';
import { getUserInfo } from '@/utils/storageManager/userInfoManager.js';
const app = getApp();
// 判断一个坐标是否在一个范围内
export const IsPtInPoly = (aLat, aLon, pointList) => {
	/* 
  :param aLon: double 经度 
  :param aLat: double 纬度 
  :param pointList: list [{latitude: 22.22, longitude: 113.113}...] 多边形点的顺序需根据顺时针或逆时针，不能乱 
  */
	var iSum = 0;
	var iCount = pointList.length;

	if (iCount < 3) {
		return false;
	}
	//  待判断的点(x, y) 为已知值
	var y = aLat;
	var x = aLon;
	for (var i = 0; i < iCount; i++) {
		var y1 = pointList[i].latitude;
		var x1 = pointList[i].longitude;
		if (i == iCount - 1) {
			var y2 = pointList[0].latitude;
			var x2 = pointList[0].longitude;
		} else {
			var y2 = pointList[i + 1].latitude;
			var x2 = pointList[i + 1].longitude;
		}
		// 当前边的 2 个端点分别为 已知值(x1, y1), (x2, y2)
		if ((y >= y1 && y < y2) || (y >= y2 && y < y1)) {
			//  y 界于 y1 和 y2 之间
			//  假设过待判断点(x, y)的水平直线和当前边的交点为(x_intersect, y_intersect)，有y_intersect = y
			// 则有（2个相似三角形，公用顶角，宽/宽 = 高/高）：|x1 - x2| / |x1 - x_intersect| = |y1 - y2| / |y1 - y|
			if (Math.abs(y1 - y2) > 0) {
				var x_intersect = x1 - ((x1 - x2) * (y1 - y)) / (y1 - y2);
				if (x_intersect < x) {
					iSum += 1;
				}
			}
		}
	}
	if (iSum % 2 != 0) {
		return true;
	} else {
		return false;
	}
};

// 判断矩形的中心点
export const calculatePolygonCenter = (polygonCoordinates) => {
	if (polygonCoordinates.length === 0) {
		return null; // 多边形没有顶点，无法计算中心点
	}

	let sumLongitude = 0;
	let sumLatitude = 0;

	// 计算顶点经度和纬度的总和
	for (let i = 0; i < polygonCoordinates.length; i++) {
		sumLongitude += polygonCoordinates[i].longitude * 1;
		sumLatitude += polygonCoordinates[i].latitude * 1;
	}

	// 计算平均值，得到中心点坐标
	let centerLongitude = sumLongitude / polygonCoordinates.length;
	let centerLatitude = sumLatitude / polygonCoordinates.length;
	return { longitude: +centerLongitude.toString().slice(0, 11), latitude: +centerLatitude.toString().slice(0, 10) };
};

// 手机号码脱敏
export const phoneHide = (phoneNumber) => {
	phoneNumber = phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(7);
	return phoneNumber;
};

// 身份证号脱敏
export const idCardHide = (idcard) => {
	return idcard.slice(0, 4) + '****' + idcard.slice(idcard.length - 4);
};
// 判断用户是否登录
export const isLogin = (showToast = true) => {
	let userInfo = getUserInfo();
	let flag = true;
	if (!userInfo) {
		if (showToast) {
			uni.showToast({
				title: '用户未登录,请登录',
				icon: 'none',
			});
		}
		flag = false;
	}
	return flag;
};

export const navigateToCheckLogin = (options) => {
	if (isLogin()) {
		uni.navigateTo(options);
	} else {
		uni.navigateTo({
			url: '/pages/login/login',
		});
	}
};
