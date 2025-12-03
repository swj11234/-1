<template>
	<view class="title-bar-wrap">
		<view :class="'my-icon iconfont '+icon"></view>
		<view class="title-bar-text">{{title}}</view>
		<view class="title-bar-more" @tap="gotoPage">更多 > </view>
	</view>
</template>


<script>
	export default {
		props: {
			title: String,
			page: String,
			icon: String,
			isTab: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		methods: {
			gotoPage() {
				if (this.isTab) {
					uni.switchTab({
						url: this.page
					})
				} else {
					uni.navigateTo({
						url: this.page
					})
				}
			}
		},
		name: "TitleBar",
		data() {
			return {

			};
		}
	}
</script>
<style scoped>
	.title-bar-wrap {
		padding: 10rpx;
	}

	.title-bar-wrap .my-icon {
		font-size: 56rpx;
		color: cyan;
	}

	.title-bar-wrap .title-bar-text {
		font-size: 48rpx;
		font-weight: bold;
		padding-left: 20rpx;
	}

	.title-bar-wrap view {
		float: left;
	}

	.title-bar-wrap .title-bar-more {
		float: right;
		font-size: 24rpx;
		color: gray;
		position: relative;
		top: 30rpx;
	}

	.title-bar-wrap::after {
		content: "";
		display: block;
		clear: both;
	}
</style>