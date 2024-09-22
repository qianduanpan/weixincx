<template>
  <view class="suggestion">
	  <view class="header">
	  	请填写合投诉建议
	  </view>
	  <view class="example">
		<uni-forms ref="baseForm" :modelValue="alignmentFormData" :label-position="alignment">
			<uni-forms-item label="联系方式" required>
				<uni-easyinput  v-model="alignmentFormData.name" placeholder="请输入您的联系方式" />
			</uni-forms-item>
			<uni-forms-item label="投诉类型" required>
				<uni-data-select v-model="alignmentFormData.type" placeholder="请选择投诉类型" :localdata="range" ></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="紧急程度" required>
				<uni-data-select v-model="alignmentFormData.rou" placeholder="请选择紧急程度" :localdata="rous" ></uni-data-select>
			</uni-forms-item>
		</uni-forms>
		 <view class="commit" >
		 	<span>确认提交</span>
		 </view>
	  </view>
  </view>
</template>

<script setup>
	import { ref } from 'vue';
	const alignment = ref('top');
	const range = ref([
	        { value: 0, text: "医院服务" },
	        { value: 1, text: "医疗质量" },
	        { value: 2, text: "医疗费用" },
	      ]);

    const rous = ref([
	        { value: 0, text: "一级" },
	        { value: 1, text: "二级" },
	        { value: 2, text: "三级级" },
	      ]);
	const alignmentFormData = ref({
		name: '',
		age: '',
	})
</script>

<style lang="scss" scoped>
	
.suggestion {
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  border: 0px solid #000000;
  padding: 0 40rpx;
 
  .header{
	 height: 136rpx;
	 line-height: 136rpx;
	 font-family: PingFang SC;
	 font-weight: 800;
	 font-size: 40rpx;
	 color: #000000; 
  }
  .example{
	  width: 670rpx;
	  height: 100%;
	  .commit{
		  height: 92rpx;
		  line-height: 92rpx;
		  text-align: center;
		  background: linear-gradient(90deg, #0BBAFB, #4285EC);
		  border-radius: 12rpx;
		  margin: 32px 0;
		  span{
			  font-family: PingFang SC;
			  font-weight: 800;
			  font-size: 28rpx;
			  color: #FFFFFF;
			  line-height: 32rpx;
		  }
	  }
  }
 
}
</style>
