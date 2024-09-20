<script>
function checkUpdate() {
	// 判断应用的 getUpdateManager 是否在当前版本可用
	// if (uni.canIUse('getUpdateManager')) {
	// 	const updateManager = uni.getUpdateManager();
	// 	// 向小程序后台请求完新版本信息
	// 	updateManager.onCheckForUpdate((res) => {
	// 		if (res.hasUpdate) {
	// 			//小程序有新版本，静默下载新版本，新版本下载完成
	// 			updateManager.onUpdateReady(() => {
	// 				//强制用户更新，弹出弹窗
	// 				uni.showModal({
	// 					title: '温馨提示',
	// 					content: '新版本已经准备好，请重启应用',
	// 					showCancel: true,
	// 					success: (res) => {
	// 						// 强制更新
	// 						if (res.confirm) {
	// 							// 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
	// 							updateManager.applyUpdate();
	// 						}
	// 					},
	// 				});
	// 			});
	// 			// 当新版本下载失败
	// 			updateManager.onUpdateFailed(() => {
	// 				uni.showModal({
	// 					title: '更新失败',
	// 					content: '请您删除当前小程序，重新打开小程序',
	// 				});
	// 			});
	// 		}
	// 	});
	// } else {
	// 	// 提示用户在最新版本的客户端上体验
	// 	uni.showModal({
	// 		title: '温馨提示',
	// 		content: '当前抖音版本过低，可能无法使用该功能，请升级到最新版本后重试。',
	// 	});
	// }
}

export default {
	globalData: {
		customerPhone: '16238800000', // 默认的统一客服电话
	},
	onLaunch: function () {
		checkUpdate();
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
@import "@/node_modules/uview-plus/index.scss";
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
page {
	background-color: #f7f7f7;
}
</style>
