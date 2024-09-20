<template>
  <view class="me-page">
	   <view class="head" @click="info">
		  <img class="avator" src="@/static/imgs/me/avator.png" alt="" />
		  <view class="box-info">
			  <view class="nickname">张三</view>
			  <view class="phone">18737620021</view>
		  </view>
	  </view>
	   <view>
		  <van-button type="primary">主要按钮1</van-button>
	   </view>
	  <view>
			  <button type="primary"  @click="handleClick">导航</button>
	  </view>
	  <view class="page-section page-section-gap">
	  	<map style="width: 750px; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
	  	</map>
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
	.head {
	    margin-top: 30px;
	    height: 150px;
	    display: flex;
	    align-items: center;
	    .avator {
	        width: 130px;
	        height: 130px;
	        border-radius: 50%;
	    }
	    .box-info {
	        padding-left: 30px;
	        flex: 1;
	        .nickname {
	            font-weight: 400;
	            font-size: 32px;
	            color: #000000;
	            line-height: 36px;
	        }
	        .phone {
	            padding-top: 20px;
	            font-weight: 400;
	            font-size: 24px;
	            color: #000000;
	            line-height: 36px;
	        }
	    }
	}
</style>
