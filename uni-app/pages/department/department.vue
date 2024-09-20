<template>
  <uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
</template>

<script setup>
	import { ref } from 'vue';
	import airport from './airport.js'
	const list = ref([])
	list.value = airport.list
	const bindClick = (e)=>{
		console.log('点击item，返回数据' + JSON.stringify(e),e)
		const params = e.item.name
		 uni.navigateTo({
		    url: `/pages/department/details?param1=${params}` // 假设详情页面路径为/pages/details/details
		  });
	}
</script>

<style lang="scss" scoped>
.home-page::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
