<template>
  <view class="home-page"> 
	   <view class="top" style="background-image: url('/static/imgs/home/homeBg.png')">
		  <text>首页</text>
		  <image class="bg" src="../../static/imgs/home/lunbo.png" mode=""></image>
	   </view>
	   <view class="center">
			<view class="ones">
				<view class="ones_top">
					<image class="left" src="../../static/imgs/home/logo.png" mode=""></image>
				    <view class="right">
				    	<view class="right_top">
				    		平顶山市第六人民医院
				    	</view>
						<view class="right_bottom">
							<text>三级</text>
							<text>公立</text>
						</view>
				    </view>
				</view>
				<view class="ones_main">
					<view class="ones_main_top">
						<image class="icons" src="../../static/imgs/home/pohon.png" mode=""></image>
						挂号咨询电话：0375-6166131
					</view>
					<view class="ones_main_bottom">
						<image class="icons" src="../../static/imgs/home/address.png" mode=""></image>
						湛河区平桐路沙河桥100米平顶山市第六人民医院
					</view>
				</view>
			</view>
			<view class="btn">
				 <text>一键咨询</text>
			</view>
		    <view class="nav">
		    	<view class="list" @click="expertClick">
					<image class="list_icon" src="../../static/imgs/home/expert.png" mode=""></image>
		    		<view class="list_title">
		    			专家介绍
		    		</view>
		    	</view>
				<view class="list" @click="departClick">
					<image class="list_icon" src="../../static/imgs/home/depart.png" mode=""></image>
					<view class="list_title">
						科室介绍
					</view>
				</view>
				<view class="list" @click="guideClick">
					<image class="list_icon" src="../../static/imgs/home/guide.png" mode=""></image>
					<view class="list_title">
						就医指南
					</view>
				</view>
				<view class="list" @click="navigationClick">
					<image class="list_icon" src="../../static/imgs/home/navigation.png" mode=""></image>
					<view class="list_title">
						来院导航
					</view>
				</view>
		    </view>

			<view class="introduce_title">
				<view class="lot"></view>
				<view class="introduce">
					医院介绍
				</view>
			</view>
			<view class="introduce_content">
		    平顶山市精神病医院是中央投资，省、市重点建设项目。
			属平顶山市卫生计生委直属公立医疗机构，以精神病及相关疾病诊断治疗与康复为主的国家二级精神病专科医院，
			履行平顶山市精神卫生与精神病质控中心、市级精神卫生防治技术管理机构职责，
			承担全市公共精神卫生任务，是平顶山市(区、县)职工、城乡居民医保定点医院医院占地6万平方米，
			建筑面积3万平方米，设计床位500张，总投资1.4亿元定位为..
			</view>
	   </view>
  </view>
</template>

<script setup>
	const handleClick = () => {
	      console.log('按钮被点击了！');
	      // 在这里执行点击后的逻辑
	    };
		// 专家列表跳转
		const expertClick = ()=>{
			 uni.navigateTo({
			    url: `/pages/home/expertInfo`
			  });
		}
		// 跳转科室介绍页面
		const departClick = ()=>{
			 uni.navigateTo({
			    url: `/pages/home/departInfo`
			  });
		}
		// 跳转就医指南
		const guideClick = ()=>{
			 uni.navigateTo({
			    url: `/pages/home/guideInfo`
			  });
		}
		// 跳转来院导航
		const navigationClick = ()=>{
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
		}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home-page{
  .top{
	width: 750rpx;
	height: 380rpx;
	text-align: center;
	background-size: cover;
	background-position: center;
	text{
		display: inline-block;
        margin-top: 114rpx;
		font-family: PingFang SC;
		font-weight: 800;
		font-size: 34rpx;
		color: #FFFFFF;
	}
	.bg{
		width: 702rpx;
		height: 320rpx;
		margin-top: 50rpx;
	}
  }
  .center{
	  margin: 0 24rpx;
	  .ones{
		  padding: 24rpx 24rpx 0 24rpx;
	  	  margin-top: 170rpx;
	  	  height: 264rpx;
	  	  background: #FFFFFF;
	  	  border-radius: 16rpx;
	  	  border: 0px solid #000000;
		 .ones_top{
			 display: flex;
			 .left{
				  width: 100rpx;
				  height: 100rpx;
			 }
			 .right{
				 margin-left: 24rpx;
				 .right_top{
					 font-family: PingFang SC;
					 font-weight: bold;
					 font-size: 32rpx;
					 color: #333333;
					 margin-bottom: 24rpx;
				 }
				 .right_bottom{
					 text{
						 text-align: center;
						 display: inline-block;
						 width: 80rpx;
						 height: 40rpx;
						 line-height: 40rpx;
						 font-family: PingFang SC;
						 font-weight: 500;
						 font-size: 24rpx;
						 color: #FFFFFF;
						background: linear-gradient(90deg, #0BBAFB, #4285EC);
						border-radius: 8rpx;
						border: 0px solid #000000;
						 margin-right: 20rpx;
					 }
				 }
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
	  .btn{
		  width: 702rpx;
		  height: 100rpx;
		  line-height: 100rpx;
		  text-align: center;
		  background-image: linear-gradient(90deg, #0BBAFB, #4285EC);
		  border-radius: 16rpx;
		  border: 0px solid #000000;
		  margin: 24rpx 0;
		  text{
			  font-family: PingFang SC;
			  font-weight: bold;
			  font-size: 28rpx;
			  color: #FFFFFF;
		  }
	  }
	  .nav{
		  height: 184rpx;
		  background: #FFFFFF;
		  border-radius: 16rpx;
		  border: 0px solid #000000;
		  display: flex;
		  .list{
			  margin-top: 32rpx;
			  height: 115rpx;
			  flex: 1;
			  text-align: center;
			  .list_icon{
				  width: 72rpx;
				  height: 90rpx;
			  }
			  .list_title{
				  font-family: PingFang SC;
				  font-weight: 500;
				  font-size: 24rpx;
				  color: #676F7C;
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
  }


}
.home-page::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;

}

</style>
