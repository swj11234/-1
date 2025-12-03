<template>
	<view class="order-rule">
		<text @tap="changeOrder('new')" :class="order=='new'?'current':''">最新</text>
		<text @tap="changeOrder('hot')" :class="order=='hot'?'current':''">最热</text>
			<view class="guide-items-wrap">
				<scroll-view scroll-y="true" :show-scrollbar="false" @scrolltolower="getMore" @scrolltoupper="refresh">
					<view class="scroll-view-wrap">
						<view class="guide-item-view" v-for="item in guideItems" :key="item.id" @tap="gotoDetail">
							<guide-item-card
								@clickthumb="doThumb(item)"
								:id="item.id"
								:title="item.title"
								:thumb-count="item.thumbCount"
								:comment-count="item.commentCount"
								:image="imageUrl+item.image"
								:is-thumb="item.isThumb">
							</guide-item-card>
						</view>
					</view>
				</scroll-view>
			<view class="bottom-tips" v-if="isLastPage">--我是有底线的--</view>
		</view>
	</view>
</template>

<script>
	import GuideItemCard from '../../components/GuideItemCard.vue';
	export default {
		data() {
			return {
				order: "new",
				pno: 1,
				guideItems: [],
				imageUrl: "",
				isLastPage: false,
				user: null
			}
		},
		onLoad() {
			const app = getApp();
			this.imageUrl = app.globalData.imageUrl;
			this.user = app.globalData.user;
			this.getData();
		},
		
		components: {
			GuideItemCard
		},
		methods: {
			changeOrder(newOrder) {
				if (newOrder == this.order) {
					return;
				}
				this.order = newOrder;
				this.pno = 1;          
				this.isLastPage = false; // 重置分页状态
				this.guideItems = [];    // 清空原有数据
				this.getData();
			},
			getData() {
				uni.request({
					url: "/api/guide/search",
					data: {
						order: this.order,
						pno: this.pno,
						size: 10
					},
					success: (resp) => {
						const pageData = resp.data && resp.data.data ? resp.data.data : {};
						this.isLastPage = pageData.isLastPage;
						let list = pageData.list || [];
						list.forEach(it => {
							it.isThumb = !!it.isThumb;
						});
						this.guideItems = this.guideItems.concat(list);
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
				this.guideItems = [];
				this.getData();
			},
			gotoDetail() {
				uni.navigateTo({
					url: "/pages/guidedetail/guidedetail"
				})
			},
			doThumb(item) {
				if (this.user == null) {
					uni.showToast({
						title: "请先登录！",
						icon: "error"
					});
					return;
				}
				let op = item.isThumb ? "cancel" : "add";
				uni.request({
					url: "/api/guidethumb/" + op,
					data: { guideId: item.id },
					success: (resp) => {
						if (resp.data.code) {
							uni.showToast({
								title: resp.data.message,
								icon: "error"
							});
						}
						if (resp.data.code == 600) {
							if (op == "add") {
								item.isThumb = true;
							}
						} else {
							if (op == "add") {
								item.isThumb = true;
								item.thumbCount++;
							} else {
								item.isThumb = false;
								item.thumbCount--;
							}
						}
						uni.showToast({
							title: "操作成功！",
							icon: "success"
						});
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

	.guide-items-wrap scroll-view {
		width: 100%;
		height: 90vh;
	}
.scroll-view-wrap{
	width: 100%;

	display: flex;
flex-wrap: wrap;	

}

.guide-item-view{
	width: 50%;
border:5px solid white;
box-sizing: border-box;
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