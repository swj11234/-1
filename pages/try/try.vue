<template>
	<view class="try-container">
		<!-- 页面标题 -->
		<view class="page-title">试用</view>
		
		<!-- 类别切换 -->
		<view class="category-tabs">
			<view class="tab-item" :class="category==='all'?'active':''" @tap="changeCategory('all')">
				<text>大众试用</text>
				<view v-if="category==='all'" class="underline"></view>
			</view>
			<view class="tab-item" :class="category==='tys'?'active':''" @tap="changeCategory('tys')">
				<text>体验师专享</text>
				<view v-if="category==='tys'" class="underline"></view>
			</view>
		</view>
		
		<!-- 状态切换 -->
		<view class="status-tabs">
			<view class="status-item" :class="status==='all'?'active':''" @tap="changeStatus('all')">
				<text>全部</text>
				<view v-if="status==='all'" class="underline"></view>
			</view>
			<view class="status-item" :class="status==='apply'?'active':''" @tap="changeStatus('apply')">
				<text>申请中</text>
				<view v-if="status==='apply'" class="underline"></view>
			</view>
			<view class="status-item" :class="status==='try'?'active':''" @tap="changeStatus('try')">
				<text>试用中</text>
				<view v-if="status==='try'" class="underline"></view>
			</view>
			<view class="status-item" :class="status==='end'?'active':''" @tap="changeStatus('end')">
				<text>已结束</text>
				<view v-if="status==='end'" class="underline"></view>
			</view>
		</view>
		
		<!-- 试用商品列表 -->
		<view class="try-items-wrap">
			<view class="try-item" v-for="(item,index) in tryItems" :key="item.id">
				<try-item-card 
					:id="item.id" 
					:image="imageUrl+item.image"
					:title="item.title" 
					:quantity="item.quantity"
					:price="item.price" 
					:apply-count="item.applyCount"
					:report-count="item.reportCount"
					:remain-days="item.remainDays" 
					:category="category"
					:status="item.status">
				</try-item-card>
			</view>
		</view>
	</view>
</template>

<script>
	import TryItemCard from '@/components/TryItemCard.vue';
	export default {
		data() {
			return {
				category: "all",
				status: "all",
				imageUrl: "",
				tryItems:[]
			}
		},
		methods: {
			getData(){
				uni.request({
					url:"/api/try/search",
					data:{category:this.category,status:this.status,size:10},
					success:(resp)=>{
						if(resp.data.code){
							uni.showToast({
								title:resp.data.message
							})
						}
						else{
							this.tryItems=resp.data.data.list;
						}
					}
				})
			},
			changeCategory(newCategory) {
				if (newCategory == this.category) {
					return;
				}
				this.category = newCategory;
				this.getData();
			},
			changeStatus(newStatus) {
				if (newStatus == this.status) {
					return;
				}
				this.status = newStatus;
				this.getData();
			}
		},
		components: {
			TryItemCard
		},
		onLoad() {
			this.imageUrl = getApp().globalData.imageUrl;
			this.getData();
		}
	}
</script>

<style scoped lang="scss">
	.try-container {
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	.page-title {
		width: 100%;
		text-align: center;
		padding: 30rpx 0 20rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		background-color: #fff;
	}
	
	.category-tabs {
		width: 100%;
		background-color: #fff;
		display: flex;
		padding: 0 40rpx;
		border-bottom: 1rpx solid #eee;
		
		.tab-item {
			flex: 1;
			text-align: center;
			padding: 25rpx 0;
			position: relative;
			
			text {
				font-size: 30rpx;
				color: #666;
			}
			
			&.active text {
				color: #ff0000;
				font-weight: bold;
			}
			
			.underline {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 80rpx;
				height: 4rpx;
				background-color: #ff0000;
			}
		}
	}
	
	.status-tabs {
		width: 100%;
		background-color: #fff;
		display: flex;
		padding: 0 20rpx;
		border-bottom: 1rpx solid #eee;
		
		.status-item {
			flex: 1;
			text-align: center;
			padding: 20rpx 0;
			position: relative;
			
			text {
				font-size: 28rpx;
				color: #666;
			}
			
			&.active text {
				color: #ff0000;
				font-weight: bold;
			}
			
			.underline {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 60rpx;
				height: 4rpx;
				background-color: #ff0000;
			}
		}
	}
	
	.try-items-wrap {
		width: 100%;
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.try-item {
			width: 48%;
			background-color: #fff;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.08);
		}
	}
</style>
