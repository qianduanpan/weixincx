import { platformName } from './platform';
/**
 * 提示与加载工具类
 */
export default class Tips {
	constructor() {
		this.isLoading = false;
	}
	/**
	 * 弹出提示框
	 */

	static success(title, duration = 2000) {
		setTimeout(() => {
			uni.showToast({
				title: title,
				icon: 'success',
				mask: true,
				duration: duration,
			});
		}, 300);
		if (duration > 0) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, duration);
			});
		}
	}

	/**
	 * 弹出确认窗口
	 */
	static confirm(text, showCancel, payload = {}, title = '提示', config = {}) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: title,
				content: text,
				showCancel: showCancel,
				...config,
				success: (res) => {
					if (res.confirm) {
						resolve(payload);
					} else if (res.cancel) {
						reject(payload);
					}
				},
				fail: (res) => {
					reject(payload);
				},
			});
		});
	}

	static async confirmAwait(text, showCancel, payload = {}, title = '提示', config = {}) {
		let result = { isConfirm: false, payload: payload };
		try {
			const res = await Tips.confirm(text, showCancel, payload, title, config);
			result.isConfirm = true;
			result.payload = res;
		} catch (err) {
			result.isConfirm = false;
			result.payload = err;
		}
		return result;
	}

	static toast(title, onHide, icon = 'none') {
		setTimeout(() => {
			uni.showToast({
				title: title,
				icon: icon,
				mask: true,
				duration: 2000,
			});
		}, 300);

		// 隐藏结束回调
		if (onHide) {
			setTimeout(() => {
				onHide();
			}, 500);
		}
	}

	/**
	 * 警告框
	 */
	static alert(title) {
		uni.showToast({
			title: title,
			icon: 'fail',
			mask: true,
			duration: 2000,
		});
	}

	/**
	 * 错误框
	 */

	static error(title, onHide) {
		const errorIcon = platformName === 'MP-TOUTIAO' ? 'fail' : 'error';
		uni.showToast({
			title: title,
			mask: true,
			duration: 2000,
			// icon: errorIcon,
		});
		// 隐藏结束回调
		if (onHide) {
			setTimeout(() => {
				onHide();
			}, 500);
		}
	}

	/**
	 * 弹出加载提示
	 */
	static loading(title = '加载中') {
		if (Tips.isLoading) {
			return;
		}
		Tips.isLoading = true;
		uni.showLoading({
			title: title,
			mask: true,
		});
	}

	/**
	 * 加载完毕
	 */
	static loaded() {
		if (Tips.isLoading) {
			Tips.isLoading = false;
			uni.hideLoading();
		}
	}

	static showAction(itemList) {
		return new Promise((resolve, reject) => {
			uni.showActionSheet({
				itemList: itemList,
				success: (e) => {
					resolve(e.tapIndex);
				},
				fail: function (res) {
					resolve(-1);
				},
			});
		});
	}

	static async showActionAwait(itemList) {
		let index = -1;
		try {
			index = await Tips.showAction(itemList);
		} catch (err) {
			index = -1;
		}
		return index;
	}
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
