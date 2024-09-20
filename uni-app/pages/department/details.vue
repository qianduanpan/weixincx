<template>
  <view class="home-page"> 
  详情页面 -- {{ param1 }}
  </view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	 
	const route = useRoute()
	const param1 = ref(route.query.param1)

	onMounted(() => {
	  console.log('Params received:', param1.value)
	})
</script>

<style lang="scss" scoped>
.home-page::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
