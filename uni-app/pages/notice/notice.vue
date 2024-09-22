<template>
 <view>
    <view class="uni-tabs-bar">
      <view v-for="(item, index) in tabs" :key="index" class="uni-tabs-name">
        <view
          class="uni-tabs-title"
          :class="{ 'uni-tabs-active': activeIndex === index }"
          @click="activeIndex = index"
        >
          {{ item }}
        </view>
		<view :class="{ 'uni-tabs-flag': activeIndex === index }"></view>
      </view>
    </view>
    <view>
      <!-- 这里放置对应标签页的内容 -->
      <view v-if="activeIndex === 0" class="content"> 
		  <view class="guide_list" @click="noticeListClick">
			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
			<view class="guide_right">
				<view class="title">
					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
				</view>
				<view class="time">
					2024-07-25
				</view>
			</view>
		  </view>
		  <view class="guide_list" @click="noticeListClick">
		  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
		  			<view class="guide_right">
		  				<view class="title">
		  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
		  				</view>
		  				<view class="time">
		  					2024-07-25
		  				</view>
		  			</view>
		  </view>
		  <view class="guide_list" @click="noticeListClick">
		  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
		  			<view class="guide_right">
		  				<view class="title">
		  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
		  				</view>
		  				<view class="time">
		  					2024-07-25
		  				</view>
		  			</view>
		  </view>
		  <view class="guide_list" @click="noticeListClick">
		  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
		  			<view class="guide_right">
		  				<view class="title">
		  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
		  				</view>
		  				<view class="time">
		  					2024-07-25
		  				</view>
		  			</view>
		  </view>
		  <view class="guide_list" @click="noticeListClick">
		  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
		  			<view class="guide_right">
		  				<view class="title">
		  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
		  				</view>
		  				<view class="time">
		  					2024-07-25
		  				</view>
		  			</view>
		  </view>
	  </view>
      <view v-if="activeIndex === 1" class="content"> 
	  <view class="guide_list" @click="noticeListClick">
	  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
	  			<view class="guide_right">
	  				<view class="title">
	  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
	  				</view>
	  				<view class="time">
	  					2024-07-25
	  				</view>
	  			</view>
	  </view>
	  <view class="guide_list" @click="noticeListClick">
	  			<image class="guide_img" src="../../static/imgs/common/bg.png" mode=""></image>
	  			<view class="guide_right">
	  				<view class="title">
	  					中秋特辑，平顶山六院中秋盛会 医患携手，温暖满满
	  				</view>
	  				<view class="time">
	  					2024-07-25
	  				</view>
	  			</view>
	  </view>
	   </view>
    </view>
  </view>
</template>
 
<script setup>
import { ref } from 'vue';
 
const tabs = ['最新动态', '健康资讯'];
const activeIndex = ref(0);

const noticeListClick = ()=>{
		uni.navigateTo({
		   url: `/pages/notice/noticeList`
		 });
	}

</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
	.uni-tabs-bar {
	  display: flex;
	  .uni-tabs-name{
		  	  flex: 1;
			  height: 90rpx;
			  line-height: 90rpx;
			  text-align: center;
			  background: #FFFFFF;
			  .uni-tabs-title {
				
			    font-family: PingFang SC;
			    font-weight: 500;
			    font-size: 28rpx;
			    color: #999999;
			  }
			  .uni-tabs-active {
			    font-family: PingFang SC;
			    font-weight: bold;
			    font-size: 28rpx;
			    color: #3F7EFA;
			  }
			  .uni-tabs-flag{
				  width: 24rpx;
				  height: 6rpx;
				  background: #3F7EFA;
				  border-radius: 3rpx;
				  border: 0px solid #000000;
				  margin: -15rpx auto;
			  }
	  }
	}
	.content{
	   margin: 24rpx;
	 .guide_list{
		height: 208rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		margin-bottom: 24rpx;
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
				margin-bottom: 40rpx;
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
.home-page::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
