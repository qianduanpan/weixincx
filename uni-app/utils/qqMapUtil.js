import QQMapWX from './qqmap-wx-jssdk.min.js';

const qqmapsdk = new QQMapWX({
	key: 'DWJBZ-76HWT-H3OXF-LYTGB-D5RMT-PUBB2',
});

export function reverseCurrentGeocoderAsync() {
	return new Promise((resolve, reject) => {
		//默认是当前位置
		qqmapsdk.reverseGeocoder({
			success(res) {
				resolve(res);
			},
			fail(err) {
				console.log(err);
				reject(err);
			},
		});
	});
}

export function reverseGeocoderAsync(options) {
	return new Promise((resolve, reject) => {
		qqmapsdk.reverseGeocoder({
			success(res) {
				resolve(res);
			},
			fail(err) {
				console.log(err);
				reject(err);
			},
			...options,
		});
	});
}

// 计算点到多个点的距离
export function calePointMileage(form, to) {
	return new Promise((resolve, reject) => {
		qqmapsdk.calculateDistance({
			mode: 'straight', //可选值：'driving'（驾车）、'walking'（步行），'straight'(直线) 不填默认：'walking',可不填
			from: form, //若起点有数据则采用起点坐标，若为空默认当前地址
			to: to, //终点坐标
			success: function (res) {
				//成功后的回调
				resolve(res.result);
			},
			fail: function (error) {
				console.error(error);
				reject(error);
			},
			complete: function (res) {},
		});
	});
}

export default qqmapsdk;
