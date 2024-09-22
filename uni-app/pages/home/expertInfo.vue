<template>
  <view class="home-page"> 
      <view class="search">
      	<uni-search-bar radius="100" placeholder="请输入医生姓名" clearButton="none" cancelButton="none" @confirm="search" />
      </view>
	   <view class="center">
			<view class="expert_list" @click="userInfoClickFn">
				<view class="left">
					<image class="pic" src="../../static/imgs/home/pic.png" mode=""></image>
				</view>
				<view class="right">
					<view class="right_name">刘冠军 副主任医师</view>
					<view class="right_depart">
						<text>精神科门诊</text>
					</view>
					<view class="right_good">擅长：精神疾病临床诊断</view>
				</view>
			</view>

		 <view class="expert_list" @click="userInfoClickFn">
		 	<view class="left">
		 		<image class="pic" src="../../static/imgs/home/pic.png" mode=""></image>
		 	</view>
		 	<view class="right">
		 		<view class="right_name">刘冠军 副主任医师</view>
		 		<view class="right_depart">
		 			<text>精神科门诊</text>
		 		</view>
		 		<view class="right_good">擅长：精神疾病临床诊断</view>
		 	</view>
		 </view>
		 <view class="expert_list" @click="userInfoClickFn">
		 	<view class="left">
		 		<image class="pic" src="../../static/imgs/home/pic.png" mode=""></image>
		 	</view>
		 	<view class="right">
		 		<view class="right_name">刘冠军 副主任医师</view>
		 		<view class="right_depart">
		 			<text>精神科门诊</text>
		 		</view>
		 		<view class="right_good">擅长：精神疾病临床诊断</view>
		 	</view>
		 </view>
		 <view class="expert_list" @click="userInfoClickFn">
		 	<view class="left">
		 		<image class="pic" src="../../static/imgs/home/pic.png" mode=""></image>
		 	</view>
		 	<view class="right">
		 		<view class="right_name">刘冠军 副主任医师</view>
		 		<view class="right_depart">
		 			<text>精神科门诊</text>
		 		</view>
		 		<view class="right_good">擅长：精神疾病临床诊断</view>
		 	</view>
		 </view>
		 <view class="expert_list" @click="userInfoClickFn">
		 	<view class="left">
		 		<image class="pic" src="../../static/imgs/home/pic.png" mode=""></image>
		 	</view>
		 	<view class="right">
		 		<view class="right_name">刘冠军 副主任医师</view>
		 		<view class="right_depart">
		 			<text>精神科门诊</text>
		 		</view>
		 		<view class="right_good">擅长：精神疾病临床诊断</view>
		 	</view>
		 </view>
		
	   </view>
  </view>
</template>

<script setup>
	const handleClick = () => {
	      console.log('按钮被点击了！');
	      // 在这里执行点击后的逻辑
	    };
		// 跳转医生介绍页面
		const userInfoClickFn = (e)=>{
			 uni.navigateTo({
			    url: `/pages/home/expertUserInfo`
			  });
		}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home-page{
	.search{
		height: 104rpx;
		background: #FFFFFF;
		border: 0px solid #000000;
	}
  .center{
	  margin: 24rpx;
	  .expert_list{
		  display: flex;
		  height: 224rpx;
		  background: #FFFFFF;
		  border-radius: 16rpx;
		  margin-bottom: 24rpx;
		  .left{
			  padding: 32rpx 32rpx 0 32rpx;
			  .pic{
				  width: 144rpx;
				  height: 144rpx;
			  }
		  }
		  .right{
			  margin-top: 34rpx;
			  .right_name{
				  font-family: PingFang SC;
				  font-weight: bold;
				  font-size: 28rpx;
				  color: #37343F;
				  line-height: 44rpx;
			  }
			  .right_depart{
				 margin-top: 24rpx;
				 width: 124rpx;
				 height: 40rpx;
				 line-height: 30rpx;
				 background: #2C71FA;
				 border-radius: 8rpx;
				 border: 0px solid #000000;
				 text-align: center;
				  text{
					  font-family: PingFang SC;
					  font-weight: bold;
					  font-size: 20rpx;
					  color: #F5F6FB;
				  }
			  }
			  .right_good{
				  margin-top: 24rpx;
				  font-family: PingFang SC;
				  font-weight: 500;
				  font-size: 24rpx;
				  color: #ADB0BA;
			  }
		  };
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
