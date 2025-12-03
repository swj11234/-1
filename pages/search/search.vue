<template>
	<view>
		搜索页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: ""
			}
		},
		onNavigationBarSearchInputChanged(event) {
			this.key = event.text;
		},
		onNavigationBarButtonTap(event) {
			if (event.index == 0) {
				uni.showToast({
					title: "开始搜索"
				})
			} else {
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>