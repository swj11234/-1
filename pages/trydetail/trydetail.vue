<template>
	<view>
		试用商品详情
		<view>商品ID: {{id}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0
			}
		},
		methods: {
			
		},
		onLoad(data){
			this.id = data.id;
		},
	}
</script>

<style>

</style>
