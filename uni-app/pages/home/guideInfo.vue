<template>
  <view class="guide"> 
   <view class="guide_list" @click="guideInfoListClick">
   	<image class="guide_img" src="../../static/imgs/home/picbg.png" mode=""></image>
	<view class="guide_right">
		<view class="title">
			就诊须知
		</view>
		<view class="time">
			2024-07-25
		</view>
	</view>
   </view>
  </view>
</template>

<script setup>
	const guideInfoListClick = ()=>{
		uni.navigateTo({
		   url: `/pages/home/guideInfoList`
		 });
	}
</script>

<style lang="scss" scoped>
.guide{
	padding: 24rpx;
	.guide_list{
		height: 208rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		.guide_img{
			margin: 24rpx;
			width: 240rpx;
			height: 160rpx;
			background: #666666;
			border-radius: 16rpx;
			border: 0px solid #000000;
		}
		.guide_right{
			margin: 24rpx;
			.title{
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #37343F;
				line-height: 44rpx;
				margin-bottom: 85rpx;
			}
			.time{
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}

}
</style>
