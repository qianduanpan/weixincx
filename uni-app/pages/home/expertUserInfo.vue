<template>
  <view class="home-page"> 
	   <view class="center">
			<view class="expert_list">
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
         <view class="expert_bottom">
			<view class="introduce_title">
				<view class="lot"></view>
				<view class="introduce_name">
					专家介绍
				</view>
			</view>
			<view class="introduce_content">
		    刘冠军，副主任医师，拥有超过15年的精神科临床工作经验。他毕业于国内著名医学院校，
			获得精神病学硕士学位，长期在三甲医院精神科门诊工作，积累了丰富的临床经验。
			刘医生注重与患者的沟通，善于通过细致的心理评估和精准的诊断帮助患者找到适合的治疗方案。
			</view>
		 </view>
		 
		 <view class="expert_bottom">
		 			<view class="introduce_title">
		 				<view class="lot"></view>
		 				<view class="introduce_name">
		 					擅长领域
		 				</view>
		 			</view>
		 			<view class="introduce_content">
		    刘医生擅长治疗各类情感障碍，包括抑郁症、双相情感障碍、焦虑症等，
			同时在精神分裂症、强迫症、失眠等精神疾病的诊疗上有深入研究。
			他尤其专注于结合药物治疗和心理干预，为患者提供个性化的全方位治疗方案，
			帮助患者改善生活质量，重获心理健康。
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
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home-page{
  .center{
	  margin: 24rpx;
	.expert_bottom{
	

	  .introduce_title{
		  margin-top: 24rpx;
		  height: 96rpx;
		  background: #FFFFFF;
		  border-radius: 24rpx 24rpx 0rpx 0rpx;
		  border: 0px solid #000000;
		  display: flex;
		  padding: 32rpx 0 0 32rpx;
		  .lot{
			  width: 8rpx;
			  height: 32rpx;
			  background: #479EFF;
			  border-radius: 4rpx;
			  border: 0px solid #000000;
			  margin-top: 2px;
		  }
		  .introduce_name{
			  margin-left: 26rpx;
			 font-family: PingFang SC;
			 font-weight: 800;
			 font-size: 32rpx;
			 color: #333333;
		  }
	  }
	  .introduce_content{
		  text-indent: 2em; /* 设置首行缩进为2em */
		  height: 480rpx;
		  background: #FFFFFF;
		  border-radius: 0rpx 0rpx 24rpx 24rpx;
		  font-family: PingFang SC;
		  font-weight: 500;
		  font-size: 26rpx;
		  color: #666666;
		  line-height: 56rpx;
		  padding: 0 32rpx 50rpx 32rpx;
		//   display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 3; /* 设置为想要的行数 */
		// overflow: hidden;
		// text-overflow: ellipsis;
	  }
   }
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
