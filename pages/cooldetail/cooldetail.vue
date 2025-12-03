<template>
	<view>
		酷玩商品信息
		<view>{{id}}</view>
		 <view>{{name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 id:0,
				 name:""
			}
		},
		methods: {
			
		},
			onLoad(data){
				this.id=data.id;
				this.name=data.name;
			},
	}
</script>

<style>

</style>
