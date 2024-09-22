<template>
  <view class="me-page">
	  <view class="top" style="background-image: url('/static/imgs/me/topBg.png')">
	    <view class="head">
		  <image class="avator" src="@/static/imgs/me/user.png" mode=""></image>
		  <view class="box-info">
			  <view class="nickname">Andrew</view>
			  <view class="phone">186****0899</view>
		  </view>
	    </view>
		  <view class="contentBtn">
			  <view class="onebtn">
				 <view class="left">
					<image class="icon_left" src="@/static/imgs/me/icon1.png" mode=""></image>
					客服帮助
				 </view>
				 <view class="right">
					<img class="icon_right" src="@/static/imgs/me/jiantou.png" alt="" />
				 </view>
			  </view>
			  <view class="onebtn" @click="handleClick">
				<view class="left">
					<image class="icon_left" src="@/static/imgs/me/icon2.png" mode=""></image>
					来院导航
				</view>
				<view class="right">
					<img class="icon_right" src="@/static/imgs/me/jiantou.png" alt="" />
				</view>
			  </view>
			  <view class="onebtn" @click="suggestionClick">
				<view class="left">
					<image class="icon_left" src="@/static/imgs/me/icon3.png" mode=""></image>
						投诉建议
				</view>
				<view class="right">
					<img class="icon_right" src="@/static/imgs/me/jiantou.png" alt="" />
				</view>
			  </view>
			  <view class="onebtn">
				<view class="left">
					<image class="icon_left" src="@/static/imgs/me/icon4.png" mode=""></image>
								关于我们
				</view>
				<view class="right">
					<img class="icon_right" src="@/static/imgs/me/jiantou.png" alt="" />
				</view>
			  </view>
			  
			  <view class="fivebtn">
						<view class="btn_list">
							<text>一键咨询</text>
						</view>
			  </view>
		  </view>
	  <!-- <view>
			  <button type="primary"  @click="handleClick">导航</button>
	  </view> -->
	  <!-- <view class="page-section page-section-gap">
	  	<map style="width: 750px; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
	  	</map>
	  </view> -->
	    </view>
   </view>
</template>

<script setup>
	import { ref } from 'vue';
	const id = ref('0')
	const latitude = ref('39.909')
	const longitude = ref('116.39742')
	const covers = ref([{
				latitude: 34.352,
				longitude: 113.38,
				iconPath: '@/static/imgs/me/avator.png'
			}, {
				latitude: 34.351,
				longitude: 113.39,
				iconPath: '@/static/imgs/me/avator.png'
			}])
			// 投诉建议
    const suggestionClick= () =>{
		uni.navigateTo({
		   url: `/pages/me/suggestion`
		 });
	}
	const handleClick = () => {
	      console.log('按钮被点击了！');
	      // 在这里执行点击后的逻辑
		  uni.openLocation({
		      latitude: 34.35, // 目的地纬度
		      longitude: 113.38, // 目的地经度
		      name: '河南中医药大学', // 目的地名称
		      address: '郑州市金水区东明路63号', // 目的地详细地址
		      success() {
		        uni.chooseLocation({
		          success: (res) => {
		            uni.openLocation({
		              latitude: res.latitude,
		              longitude: res.longitude,
		              name: res.name,
		              address: res.address,
		              success() {
		                console.log('导航启动');
		              },
		              fail(err) {
		                console.error('导航失败', err);
		              },
		            });
		          },
		          fail(err) {
		            console.error('选择位置失败', err);
		          },
		        });
		      },
		      fail(err) {
		        console.error('打开位置失败', err);
		      },
		    });
	    };
		
		
</script>

<style lang="scss" scoped>
	.top{
		height: 450rpx;
		background-size: cover;
		background-position: center;
	}
	.head {
	    padding-top: 214rpx;
		padding-bottom: 62rpx;
		margin-left: 40rpx;
	    display: flex;
	    align-items: center;
	    .avator {
	       width: 112rpx;
	       height: 112rpx;
	       border-radius: 50%;
	    }
	    .box-info {
	        padding-left: 23rpx;
	        flex: 1;
	        .nickname {
	            font-family: PingFang SC;
	            font-weight: 800;
	            font-size: 32rpx;
	            color: #FFFFFF;
	            line-height: 40rpx;
	        }
	        .phone {
	            padding-top: 23rpx;
	            font-family: PingFang SC;
	            font-weight: 500;
	            font-size: 28rpx;
	            color: #FFFFFF;
	        }
	    }
	}
	.contentBtn{
		width: 686rpx;
		margin: 0 auto;
		.onebtn{
			height: 113rpx;
			line-height: 113rpx;
			background: #FFFFFF;
			border-radius: 16rpx 16rpx 0rpx 0rpx;
			border-bottom: 1px solid #EEEEEE;
			display: flex;
			justify-content: space-between;
			.left{
				margin-left: 32rpx;

				font-family: PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #333333;
				.icon_left{
					width: 32rpx;
					height: 32rpx;
					vertical-align: middle;
					margin-right: 24rpx;
				}
				
			}
			.right{
				margin-right: 32rpx;
				.icon_right{
					width: 14rpx;
					height: 24rpx;
					vertical-align: middle;
				}
			}
		}
		.fivebtn{
			padding: 40rpx 32rpx;
			background: #FFFFFF;
			border-radius: 0rpx 0rpx 16rpx 16rpx;
			border-bottom: 1px solid #EEEEEE;
			.btn_list{
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				background: linear-gradient(90deg, #0BBAFB, #4285EC);
				border-radius: 12rpx;
				text{
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 32rpx;
				}
			}
		}

	}
</style>
