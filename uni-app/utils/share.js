import { userEventTracking, getPageRouteTitle } from './userEventTracking';
let shareAppImgUrlsByPengYouQuan = [];
let shareAppMessageByPengYouQuan = '酷狗出行';
let shareAppImgUrlsByUser = [];
let shareAppMessageByUser = '酷狗出行';

export function getShareAppImgUrlsByPengYouQuan() {
	return shareAppImgUrlsByPengYouQuan;
}
export function setShareAppImgUrlsByPengYouQuan(urls) {
	shareAppImgUrlsByPengYouQuan = urls;
}

export function getShareAppMessageByPengYouQuan() {
	return shareAppMessageByPengYouQuan;
}
export function setShareAppMessageByPengYouQuan(message) {
	shareAppMessageByPengYouQuan = message;
}

export function getShareAppImgUrlsByUser() {
	return shareAppImgUrlsByUser;
}
export function setShareAppImgUrlsByUser(urls) {
	shareAppImgUrlsByUser = urls;
}

export function getShareAppMessageByUser() {
	return shareAppMessageByUser;
}
export function setShareAppMessageByUser(message) {
	shareAppMessageByUser = message;
}

export function sharePengYouQuan() {
	if (shareAppImgUrlsByPengYouQuan.length == 1) {
		return {
			title: shareAppMessageByPengYouQuan,
			desc: '',
			path: '/pages/home/home',
			imageUrl: shareAppImgUrlsByPengYouQuan[0].imgPath,
		};
	}
	return {
		title: shareAppMessageByPengYouQuan,
		desc: '',
		path: '/pages/home/home',
	};
}
export function shareUser() {
	if (shareAppImgUrlsByUser.length == 1) {
		return {
			title: shareAppMessageByUser,
			desc: '',
			path: '/pages/home/home',
			imageUrl: shareAppImgUrlsByUser[0].imgPath,
		};
	}
	return {
		title: shareAppMessageByUser,
		desc: '',
		path: '/pages/home/home',
	};
}
//用于mixin
export default {
	onShareAppMessage() {
		userEventTracking({
			actionStr: `${getPageRouteTitle()}页面-分享到个人`,
			actionType: '5',
		});
		return shareUser();
	},
	onShareTimeline() {
		userEventTracking({
			actionStr: `${getPageRouteTitle()}页面-分享到朋友圈`,
			actionType: '5',
		});
		return sharePengYouQuan();
	},
};
