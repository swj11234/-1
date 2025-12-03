<template>
	<view class="order-rule">
		<text @tap="changeOrder('new')" :class="order=='new'?'current':''">最新</text>
		<text @tap="changeOrder('hot')" :class="order=='hot'?'current':''">最热</text>
		<view class="cool-items-wrap">
			<scroll-view scroll-y="true" :show-scrollbar="false" @scrolltolower="getMore" @scrolltoupper="refresh">
				<view class="scroll-view-wrap">
					<view class="cool-item-view" v-for="item in coolItems" @tap="gotoDetail(item)">
						<cool-item-card @clickthumb="doThumb(item)" :id="item.id" :name="item.name" :title="item.title"
							:price="item.price" :thumb-count="item.thumbCount" :comment-count="item.commentCount"
							:image="imageUrl+item.image" :is-thumb="item.isThumb"></cool-item-card>
					</view>
				</view>
			</scroll-view>
			<view class="bottom-tips" v-if="isLastPage">--我是有底线的--</view>
		</view>

	</view>


</template>

<script>
	import CoolItemCard from '../../components/CoolItemCard.vue';
	export default {
		data() {
			return {
				order: "new",
				pno: 1,
				coolItems: [],
				imageUrl: "",
				isLastPage: false,
				user: null
			}
		},
		onLoad() {
			this.imageUrl = getApp().globalData.imageUrl;
			this.checkLoginStatus();
			this.getData();

		},
		onShow(){
			this.checkLoginStatus();
		},
		
		components: {
			CoolItemCard
		},
		methods: {
			checkLoginStatus() {
				const app = getApp();
				let userInfo = null;
				if (app.globalData.isLogin && app.globalData.userInfo) {
					userInfo = app.globalData.userInfo;
				} else {
					const isLogin = uni.getStorageSync('isLogin');
					if (isLogin) {
						userInfo = uni.getStorageSync('userInfo');
						if (userInfo) {
							app.globalData.userInfo = userInfo;
							app.globalData.isLogin = true;
							app.globalData.user = userInfo;
						}
					}
				}
				this.user = userInfo || null;
			},
			changeOrder(newOrder) {
				if (newOrder == this.order) {
					return;
				}
				this.order = newOrder;
				 this.pno = 1;          
				    this.isLastPage = false; // 重置分页状态
				    this.coolItems = [];    // 清空原有数据
		
				    this.getData();

			},
			getData() {
				uni.request({
					url: "/api/coolitem/search",
					data: {
						order: this.order,
						pno: this.pno,
						size: 10
					},
					success: (resp) => {
						this.isLastPage = resp.data.data.isLastPage;
						// 确保 isThumb 是布尔值
						if(resp.data.data.list) {
							resp.data.data.list.forEach(item => {
								item.isThumb = !!item.isThumb; // 转换为布尔值
							});
						}
						this.coolItems = this.coolItems.concat(resp.data.data.list);
						console.log(resp);
					},
					fail: function(resp) {
						uni.showToast({
							title: "出错了",
							icon: 'error'
						})
					}
				})
			},
			getMore() {
				if (this.isLastPage) {
					return;
				}
				this.pno++;
				this.getData();
			},
			refresh() {
				this.pno = 1;
				this.isLastPage = false;
				this.coolItems = [];
				this.getData();
			},
			gotoDetail(data) {
			 uni.navigateTo({
			 url: "/pages/cooldetail/cooldetail?id="+data.id+"&name="+encodeURI(data.name)
			 })
			 },
			doThumb(data) {
				if(this.user == null) {
					uni.showToast({
						title: "请先登录！",
						icon: "error"
					});
					return;
				}
				let op = data.isThumb ? "cancel" : "add";
				uni.request({
					url: "/api/coolthumb/" + op,
					data: {itemId: data.id},
					success: (resp) => {
						if(resp.data.code) {
							uni.showToast({
								title: resp.data.message,
								icon: "error"
							});
							if(resp.data.code == 600) {
								if(op == "add") {
									data.isThumb = true;
								}
							}
						}
						else {
							if(op == "add") {
								data.isThumb = true;
								data.thumbCount++;
							}
							else {
								data.isThumb = false;
								data.thumbCount--;
							}
							uni.showToast({
								title: "操作成功",
								icon: "success"
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.bottom-tips {
		text-align: center;
		color: gray;
		font-size: 24rpx
	}

	.cool-items-wrap scroll-view {
		width: 100%;
		height: 90vh;
	}

	.order-rule {
		width: 92%;
		margin: 10rpx 4%;

	}

	.order-rule text {
		display: inline-block;
		width: 50%;
		text-align: center;
	}

	.current {
		color: red;
		font-weight: bold;
		border-bottom: 4rpx solid red;
	}
</style>