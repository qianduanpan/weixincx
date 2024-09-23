<template>
  <view class="home-page">
	<view class="serch_name">
  	   <uni-search-bar  radius="100" placeholder="请输入" clearButton="none" cancelButton="none" @confirm="search" />
	 </view>
    <view class="serch_list">
    	 <uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
    </view>
  </view>

</template>

<script setup>
	import { ref } from 'vue';
	import airport from './airport.js'
	const list = ref([])
	list.value = airport.list
	const bindClick = (e)=>{
		console.log('点击item，返回数据' + JSON.stringify(e),e)
		const params = e.item.name
		// console.log(params,'99')
		 uni.navigateTo({
		    url: `/pages/home/departInfo?name=${params}` // 假设详情页面路径为/pages/details/details
		  });
	}
	
	const search = ()=>{
		
	}
</script>

<style lang="scss" scoped>

	.home-page{
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		.serch_name{
			
		}
		.serch_list{
			height: 100vh;
			margin-top: 50rpx;
			/* 或者 Vue 3.x 中使用 */
			:deep(.uni-indexed-list .uni-indexed-list__list) {
			  background-color:#ffffff;
			}
			:deep(.uni-indexed-list){
				position: absolute;
				top: 100rpx;
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
