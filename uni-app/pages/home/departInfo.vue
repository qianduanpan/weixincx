<template>
  <view class="home-page"> 
	   <view class="center">
			<view class="ones">
				<view class="ones_top">
					<view class="ones_top_title">
						精神科门诊
					</view>
				</view>
				<view class="ones_main">
					<view class="ones_main_top">
						<image class="icons" src="../../static/imgs/home/pohon.png" mode=""></image>
						科室电话：0375-6166131
					</view>
					<view class="ones_main_bottom">
						<image class="icons" src="../../static/imgs/home/address.png" mode=""></image>
						科室位置：三楼东北角
					</view>
				</view>
			</view>

			<view class="introduce_title">
				<view class="lot"></view>
				<view class="introduce">
					科室介绍
				</view>
			</view>
			<view class="introduce_content">
		    平顶山市精神病医院是中央投资，省、市重点建设项目。
			属平顶山市卫生计生委直属公立医疗机构，以精神病及相关疾病诊断治疗与康复为主的国家二级精神病专科医院，
			履行平顶山市精神卫生与精神病质控中心、市级精神卫生防治技术管理机构职责，
			承担全市公共精神卫生任务，是平顶山市(区、县)职工、城乡居民医保定点医院医院占地6万平方米，
			建筑面积3万平方米，设计床位500张，总投资1.4亿元定位为..
			</view>
			
			<view class="expert">
				科室专家
			</view>
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
	   </view>
  </view>
</template>

<script setup>
	const handleClick = () => {
	      console.log('按钮被点击了！');
	      // 在这里执行点击后的逻辑
	    };
		// 跳转科室介绍页面
		const departClick = (e)=>{
			 uni.navigateTo({
			    url: `/pages/home/departInfo`
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
  .center{
	  margin: 24rpx;
	  .ones{
		  padding: 24rpx 24rpx 0 24rpx;
	  	  height: 224rpx;
	  	  background: #FFFFFF;
	  	  border-radius: 16rpx;
	  	  border: 0px solid #000000;
		 .ones_top{
			.ones_top_title{
				font-family: PingFang SC;
				font-weight: 800;
				font-size: 36rpx;
				color: #333333;
			}
		 }
		 .ones_main{
			 margin-top: 32rpx;
			  .ones_main_top{
				  font-family: PingFang SC;
				  font-weight: 500;
				  font-size: 24rpx;
				  color: #999999;
				  .icons{
					  width: 26rpx;
					  height: 26rpx;
					  margin-right: 16rpx;
					  vertical-align: middle;
				  }
			  }
			  .ones_main_bottom{
				  margin-top: 23rpx;
				  font-family: PingFang SC;
				  font-weight: 500;
				  font-size: 24rpx;
				  color: #999999;
				  .icons{
					  width: 26rpx;
					  height: 26rpx;
					  margin-right: 16rpx;
					  vertical-align: middle;
				  }
			  }
		 }
	  }

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
		  .introduce{
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
	  .expert{
		  margin-top: 41rpx;
		  margin-bottom: 48rpx;
		  margin-left: 26rpx;
		  font-family: PingFang SC;
		  font-weight: 800;
		  font-size: 32rpx;
		  color: #333333;
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
