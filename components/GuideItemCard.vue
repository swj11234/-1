<template>
	<view class="guide-item-card-wrap">
		<view class="guide-item-image">
			<image :src="image"></image>
		</view>

		<view class="guide-item-title">{{title}}</view>
		<view class="guide-item-price-thumb">
		
			<view class="guide-item-comment">
				<text class="iconfont icon-comment"></text>
				<text>{{commentCount}}</text>
			</view>
			<view class="guide-item-thumb">
				<text :class="'iconfont icon-thumbs-up '+(isThumb?'active':'')" @tap.stop="doThumb"></text>
				<text>{{thumbCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			id: {},
			type: Number,
			required: true,
			title: {
				type: String,
				required: true
			},
			image: {
				type: String,
				required: true
			},
			thumbCount: {
				type: Number,
				required: false,
				default: 0
			},
			commentCount: {
				type: Number,
				required: false,
				default: 0
			},
			isThumb: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		name: "GuideItemCard",
		methods: {
			doThumb() {
				this.$emit("clickthumb");
			}
		},
	}
</script>

<style>
	.active {
		color: red;
	}

	.guide-item-image image {
		width: 100%;
		height: 150px;
	}

	.guide-item-name {
		font-size: 38rpx;
		width: 92%;
		margin: 6rpx 4% 0;
	}

	.guide-item-title {
		font-size: 28rpx;
		color: gray;
		width: 92%;
		margin: 6rpx 4% 0;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 限制显示的行数为 3 */
		overflow: hidden;
	}

	.guide-item-price-thumb {
		width: 92%;
		margin: 20rpx 4%;
	}

	.guide-item-price {
		color: red;
		font-size: 32rpx;
		float: left;
	}

	.guide-item-thumb {
		font-size: 28rpx;
		color: gray;
		float: right;
		margin-right: 10rpx;
	}

	.guide-item-comment {
		font-size: 28rpx;
		color: gray;
		float: right;
	}

	.guide-item-price-thumb::after {
		content: "";
		display: block;
		clear: both;
	}
</style>